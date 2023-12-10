const express = require('express');
const cors = require('cors');
const config = require('./common/config/env.config');
const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const FoodRouter = require('./food/routes.config');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});

app.use(cors());
app.use(express.json());

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
FoodRouter.routesConfig(app);

app.listen(config.port, () => {
  console.log(`App listening at port ${config.port}`);
});
