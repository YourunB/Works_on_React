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
    let result = this.props.children;
    for (let i = 0; i < this.state.colors.length; i++) result = <div className='frame' style={{borderColor:this.state.colors[i]}}>{result}</div>;
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