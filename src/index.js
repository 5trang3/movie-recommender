import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='App'></div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
