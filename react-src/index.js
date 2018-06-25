import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Your app is ready for development!</h1>
        <p>To start developing, open <code>src/index.js</code></p>
      </div>
    )
  }
}

ReactDOM.render(
  <App />
  , document.getElementsByClassName('viewport')[0]
);

registerServiceWorker();
