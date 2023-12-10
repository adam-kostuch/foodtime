const RecipesModel = require('../models/recipes.model');
const helpers = require('../../../helpers/index');

exports.insert = (req, res) => {
  req.body.image = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  RecipesModel.createRecipe(req.body).then((result) => {
    res.status(201).send({ id: result._id });
  });
};

exports.list = (req, res) => {
  const { limit, page } = helpers.parseParams(req);

  RecipesModel.list(limit, page).then((result) => {
    res.status(200).send(result);
  });
};

exports.getById = (req, res) => {
  RecipesModel.findById(req.params.recipeId).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  if (req.file && req.file.buffer && req.file.mimetype) {
    req.body.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }

  RecipesModel.patchRecipe(req.params.recipeId, req.body).then(() => {
    res.status(204).send({});
  });
};

exports.removeById = (req, res) => {
  RecipesModel.removeById(req.params.recipeId).then(() => {
    res.status(204).send({});
  });
};
