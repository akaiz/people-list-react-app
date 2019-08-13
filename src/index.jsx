import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { render } from 'react-dom';
import App from './components/App';
import configureStore from './store';
import rootSaga from './sagas';
import 'styles/index.scss';

const initialState = {};
const history = createBrowserHistory();
const appStore = configureStore(initialState, history);
appStore.runSaga(rootSaga);

const renderApp = () => {
  const root = document.getElementById('app');
  if (root) {
    render(
      <Provider store={appStore}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>,
      root,
    );
  }
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp);
}

renderApp();
