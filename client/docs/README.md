# Foodtime client

Author: [@adam-kostuch](https://github.com/adam-kostuch)

This repo folder is dedicated strictly to Foodtime client. It is React app, based on Vite with additional packages just like axios, @mui, react-router and formik. Those packages are strictly working with each other in order to create unified and simple frontend application for the forum users. This project also uses MVC framework for managing the clean code. That being said the folder is divided into following paths: `modules` which is replaced with `services`, `views` and `components`. In order to get to know the app better see further following doc.

## Usage requirements

In order to run this project, you don't need anything special installed, maybe besides:

- Node.js installed with npm (https://nodejs.org/),

With only those packages installed on your machine you are completely fine with running this project.

## Usage

In order to run the project you need to match the [project requirements](#usage-requirements), if all are matched, you can then proceed with the following command:

```sh
$ npm run dev
```

or see main `README.md` file for even easier setup.

## Technical details

### Stack used

This frontend part of the project uses following tools to interact with each other:

```
  - Material-UI - used for using pre-styled components
  - Axios - used for better fetching features
  - Formik - used for managing form elements
  - React Query - used for interacting query with axios requests
  - React Router DOM - used for managing paths and urls of the site
  - Yup - used strictly for form validation
```

### Views

The app is divided into multiple urls, which are:

```ssh
  - Landing Page - `/`
  - All Recipes Page - `/recipes`
  - Single Recipe Page - `/recipes/:recipeId`
  - Add Recipe Page - `/recipes/add`
  - Update Recipe Page - `/recipes/update/:recipeId`
```

All of those are managed through react-router-dom package

### API client

In order to use API client I created a `FoodtimeApiClient.ts` which is simple Typescript class for managing the API requests with some custom middleware. Please reference to the file for more info.

Also for authentication session is used and sign user out when we do not refresh our token in an hour time limit.

### Prop usage

In order to avoid prop-drilling which is not a good standard in React, I decided to use custom build React Context, which is an abstract layer in the DOM that user cannot see. It provides some data that can be imported and used in every child component of the Context.

For example there are specified modal states to manage Landing Page modals in every layer of Landing Page.
