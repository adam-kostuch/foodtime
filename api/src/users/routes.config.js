const UsersController = require('./controllers/users.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = (app) => {
  app.post('/users', [UsersController.insert]);
  app.get('/users', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.list,
  ]);
  app.get('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.getById,
  ]);
  app.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.patchById,
  ]);
  app.delete('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.removeById,
  ]);
};
