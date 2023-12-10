# Foodtime API

Author: [@adam-kostuch](https://github.com/adam-kostuch)

This repo folder is dedicated strictly to Foodtime API. It uses mongodb in the backend as non-SQL database which is perfect for fast responses and not really complicated projects with lots of data needed to be stored. There are two tables in the database one for authentication and the second one strictly to food related data.

## Usage requirements

In order to run the project here are some tools that are needed before installation:

- Node.js installed (https://nodejs.org/),
- Docker installed (https://www.docker.com/),

There is no need to install mongodb or either mongoose as it's run in the Docker container.

## Usage

In order to run the project you need to match the [project requirements](#usage-requirements), if all are matched, you can then proceed with the following commands:

```sh
$ docker compose build
$ docker compose up
```

## Technical details

### Stack used

This backend part of the project uses following tools to interact with each other:

```
- Node - used as the default API engine
- Docker - used for containerizing both mongodb and swagger images
- Swagger - used for writing user-friendly API definition
```

### Database tables

As for now, there are only two tables available with the following schemas:

```
Users = {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
}

Recipes = {
  title: String,
  ingredients: [String],
  imageUrl: String,
  instructions: String,
  notes: String,
  authorName: String,
  estimatedTime: String,
  category: String,
  caloriesPerPortion: Number,
  amountOfPortions: Number
}
```

As `mongodb` is a non-SQL database those tables are not meant to interact with each other, that is why the `Recipes` table has direct field `authorName` which is simply a full name of the user that created a recipe.

### API

For more technical details please use docker container with the proper image and go to `localhost:8090`, to see the Swagger documentation.

NOTE: Recipes are places under the `/food` path in case we want to expand the APi for other food related endpoints (e.g. nutrition's).
