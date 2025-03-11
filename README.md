# Skeleton of Resultant Demo v1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.11.

## Frontend Development server

Run `cd Angular`, install all the depencens runing `npm install` and after `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. and automatically open you your 4200 port to consult the site in another PC insider yout local network. http://[myLocalIP]:4200/]

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## NodeJS Backend Development Server

Run `cd App`, install all the depencens runing `npm install` and after `npm start` for a dev server. Navigate to `http://localhost:3000/`

## API naming

- Every endpoint in the api has to be named by `http://localhost:3000/api/{proyect}/{area}/{version}/{plural endpoint reference}` 
- Index.js shouldn't modificate
- app.js remove the cors issue and allow the folder to save the angular build to show
- {proyect}.routes.js got the endpoint and methos that are in the api
- {proyect}.controller.js got the methods to execute when a route is called
- interfaces.model.js got the generic response to every api call