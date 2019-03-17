import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let giphyApiHost = process.env.REACT_APP_GIPHY_API_HOST;

if (process.env.NODE_ENV === 'test' || process.env.REACT_APP_TEST_ENV === 'nightwatch') {
  giphyApiHost = 'http://localhost:3002';
}

ReactDOM.render(<App giphyApiHost={giphyApiHost} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
