import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

class HelloWord extends Component {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <p>To start developing, open <code>src/index.js</code> </p>
      </div>
    )
  }
}

ReactDOM.render(
  <HelloWord />
  , document.getElementsByClassName('viewport')[0]
);

registerServiceWorker();
