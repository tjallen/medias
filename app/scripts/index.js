// global postcss
require('../styles/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('app');

ReactDOM.render(
  <App />,
  rootElement
);
