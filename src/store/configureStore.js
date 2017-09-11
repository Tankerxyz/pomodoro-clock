import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default function configureStore() {
  const initialState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  });

  return store;
}