import React from 'react';
import PropTypes, { element } from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    text:PropTypes.string.isRequired,
    colors:PropTypes.array.isRequired,
  };

  state = {
    text: this.props.text,
    colors: this.props.colors,
  };

  createFrames = () => {
    let result = [];
    for (let i = 0; i < this.state.colors.length; i++) {
      if (i === 0) result.push(<div className='frame' key={this.state.colors[i]} style={{borderColor:this.state.colors[i]}}><p>{this.state.text}</p></div>);
      if (i > 0 && i < this.state.colors.length) result.push(<div className='frame' key={this.state.colors[i]} style={{borderColor:this.state.colors[i]}}>{result[i-1]}</div>);
    }
    return result[this.state.colors.length - 1];
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