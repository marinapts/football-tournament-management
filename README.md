# Football Tournament Management

## Overview
Football Tournament Management is a system that allows users to specify the participating team names
and the list of fixtures where each team plays every other team once. The league table is then updated
automatically, based on the user's input values. 

The league table shows Wins, Draws, Losses, Goals For, Goals Against, Goal Difference and Points.
Teams get 3 points for a win, 1 for a draw and 0 for a loss.
The league table is ordered by Points, Goal difference and then alphabetically.


## Tools used
* [React](https://facebook.github.io/react/)
    * JS library for building user interfaces

* [Webpack](https://webpack.js.org/) 
    * Initialising webpack-dev-server
    * Bundling js and css files
    * Compiling

* [Materialize-css](https://v4-alpha.getbootstrap.com/getting-started/introduction/) 
    * Responsive CSS framework based on Material Design 

* [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage)
    * LocalStorage allows us to store data locally within the user's browser. We use it to 
    get and store teams and fixtures.


## Prerequisites
You need to have the latest version of node and npm or yarn installed on your computer.


## Installation and run

 
```yarn``` or ```npm install``` 

### Development

```yarn start``` or ```npm start```

### Production

```yarn run build```


In browser type: 
```localhost:3000```
