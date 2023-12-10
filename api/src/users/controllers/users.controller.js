const crypto = require('crypto');
const UserModel = require('../models/users.model');
const helpers = require('../../helpers/index');

exports.insert = (req, res) => {
  const hashedPassword = helpers.hashedPassword(req.body.password);

  req.body.password = hashedPassword;
  if (!req.body.permissionLevel) {
    req.body.permissionLevel = 1;
  }

  UserModel.createUser(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};

exports.list = (req, res) => {
  const { limit, page } = helpers.parseParams(req);

  UserModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto
      .createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64');
    req.body.password = `${salt}$${hash}`;
  }

  UserModel.patchUser(req.params.userId, req.body).then(() => {
    res.status(204).send({});
  });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId).then(() => {
    res.status(204).send({});
  });
};
