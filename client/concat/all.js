if (window.NP === undefined) { window.NP = {}; }

(() => {

  class SecondComponent extends React.Component {

    render() {
      
      return <div>second component</div>
    }
  }

  NP.SecondComponent = SecondComponent;
})()

import React from 'react';
import ReactDOM from 'react-dom';

var mountNode = document.querySelector('#react-root');

class AppComponent extends React.Component {
  render() {
    return <div><p>React works!</p><NP.SecondComponent /></div>;
  }
}

ReactDOM.render(<AppComponent />, mountNode);
