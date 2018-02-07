import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware/* , compose */ } from 'redux';
import thunk from 'redux-thunk';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Root from './containers/Root';
import rootReducer from './reducers/';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  // compose(
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // ),
);
/* eslint-enable */

render(
  <Router>
    <MuiThemeProvider>
      <Root store={store} />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
