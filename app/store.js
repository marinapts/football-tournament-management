import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appReducer from './reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'



// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    appReducer,
    routing: routerReducer
  }),
  applyMiddleware(routerMiddleware(browserHistory), thunk, logger)
)

export default store;