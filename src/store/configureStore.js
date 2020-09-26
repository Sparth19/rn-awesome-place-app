import React from 'react';
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import placeReducer from './reducers/places';
import uiReducer from '../store/reducers/ui';
import authReducer from '../store/reducers/auth';

const rootReducer = combineReducers({
  places: placeReducer,
  ui: uiReducer,
  auth: authReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk)),
  );
};
export default configureStore;
