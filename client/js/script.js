import React from 'react';
import ReactDOM from 'react-dom';

var mountNode = document.querySelector('#react-root');

class AppComponent extends React.Component {
  render() {
    return <div>React works!</div>;
  }
}

ReactDOM.render(<AppComponent />, mountNode);
