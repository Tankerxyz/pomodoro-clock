import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';
import 'font-awesome/css/font-awesome.min.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
