const crypto = require('crypto');

exports.parseParams = (req) => {
  const limit =
    req.query.limit && req.query.limit >= 100
      ? parseInt(req.query.limit, 10)
      : 100;
  let page = 0;

  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page, 10);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  return { limit, page };
};

exports.hashedPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
    .digest('base64');

  return `${salt}$${hash}`;
};

exports.findUserByEmailParser = (req, res, user) => {
  if (!user[0]) {
    res.status(404).send({ user });
  } else {
    const passwordFields = user[0].password.split('$');
    const salt = passwordFields[0];
    const hash = crypto
      .createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64');

    if (hash === passwordFields[1]) {
      req.body = {
        userId: user[0]._id,
        email: user[0].email,
        permissionLevel: user[0].permissionLevel,
        provider: 'email',
        name: `${user[0].firstName} ${user[0].lastName}`,
      };
      return req.body;
    }
    return res.status(400).send({ errors: ['Invalid e-mail or password'] });
  }
};
