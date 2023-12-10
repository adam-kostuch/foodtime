const multer = require('multer');

const RecipesController = require('./recipes/controllers/recipes.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.routesConfig = (app) => {
  app.post('/food/recipes', upload.single('image'), [RecipesController.insert]);
  app.get('/food/recipes', [RecipesController.list]);
  app.get('/food/recipes/:recipeId', [RecipesController.getById]);
  app.patch('/food/recipes/:recipeId', upload.single('image'), [
    RecipesController.patchById,
  ]);
  app.delete('/food/recipes/:recipeId', [RecipesController.removeById]);
};
