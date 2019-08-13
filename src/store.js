import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import 'babel-polyfill';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}, history) => {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer(),
    fromJS(initialState),
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  store.close = () => store.dispatch(END);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);
        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
};

export default configureStore;
