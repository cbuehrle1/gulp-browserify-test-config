import React from 'react';
import ReactDOM from 'react-dom';

var mountNode = document.querySelector('#react-root');

class AppComponent extends React.Component {
  render() {
    return <div><p>React works!</p><p>Build is working</p></div>;
  }
}

ReactDOM.render(<AppComponent />, mountNode);
