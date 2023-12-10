const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserModel = require('../../users/models/users.model');
const jwtSecret = require('../../common/config/env.config').jwt_secret;

exports.login = async (req, res) => {
  const accessToken = jwt.sign(req.body, jwtSecret);
  let user;
  let refreshToken;

  await UserModel.findByEmail(req.body.email).then((result) => {
    if (!result[0]) {
      res.status(404).send({ result });
    } else {
      const passwordFields = result[0].password.split('$');
      const salt = passwordFields[0];
      const hash = crypto
        .createHmac('sha512', salt)
        .update(req.body.password)
        .digest('base64');

      req.body.refreshKey = salt;
      const b = Buffer.from(hash);
      refreshToken = b.toString('base64');

      if (hash === passwordFields[1]) {
        user = {
          userId: result[0]._id,
          email: result[0].email,
          permissionLevel: result[0].permissionLevel,
          provider: 'email',
          name: `${result[0].firstName} ${result[0].lastName}`,
        };

        return user;
      }
      return res.status(400).send({ errors: ['Invalid e-mail or password'] });
    }
  });

  res.status(201).send({ accessToken, refreshToken, user });
};
