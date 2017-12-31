import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import { render } from 'react-dom';

import './index.css';
import Root from './containers/Root';
import posts from './reducers/';
import registerServiceWorker from './registerServiceWorker';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  posts,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
