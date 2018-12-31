import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import auth from '../reducers/auth';
import material from '../reducers/material';
import exam from '../reducers/exam';
import filters from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth,
      material,
      exam,
      filters
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
