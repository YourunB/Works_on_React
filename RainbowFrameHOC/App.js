import React from 'react';
import ReactDOM from 'react-dom';

import './components/DoubleButton.css';

import DoubleButton from './components/DoubleButton.js';
import { withRainbowFrame } from './components/withRainbowFrame';

class App extends React.Component {

  state = {
    btn: 1,
  }

  changeBtn = (n) => {
    this.setState( {btn: n} )
  }

  render() {

    const DoubleButtonWithFrame = withRainbowFrame(['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'])(DoubleButton);

    return (
      <div>
        <DoubleButtonWithFrame changeBtn = { this.changeBtn }  caption1 = {(this.state.btn === 1) ? 'Я из лесу' : 'Однажды'} caption2 = {(this.state.btn === 1) ? 'мороз' : 'пору'}> {(this.state.btn === 1) ? ' вышел, был сильный ' : ' студеную зимнюю '}</DoubleButtonWithFrame>
      </div>
    );
  }

}

export default App;

ReactDOM.render( 
  <App/>, document.getElementById('container') );