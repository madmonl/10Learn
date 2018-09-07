import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import materialReducer from '../reducers/material';
import exam from '../reducers/exam';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      material: materialReducer,
      exam: exam
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
