import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatch a function');
  } else {
    console.log('dispatch', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());
  return result;
};

const middlewares = [logger, thunk];

export default createStore(rootReducer, applyMiddleware(...middlewares));
