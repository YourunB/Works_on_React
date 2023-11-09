import React from 'react';
import PropTypes, { element } from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors:PropTypes.array.isRequired,
  };

  state = {
    colors: this.props.colors,
  };

  createFrames = () => {
    let result;

    for (let i = 0; i < this.state.colors.length; i++) {
      if (i === 0) result = <div className='frame' key={this.state.colors[i]} style={{borderColor:this.state.colors[i]}}><p>{this.props.children}</p></div>;
      if (i > 0 && i < this.state.colors.length) result = <div className='frame' key={this.state.colors[i]} style={{borderColor:this.state.colors[i]}}>{result}</div>;
    }
    
    return result;
  }

  render() {

    return (
      <div>
        {this.createFrames()}
      </div>
    );
  }

}

export default RainbowFrame;