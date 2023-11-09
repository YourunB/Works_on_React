import React from 'react';
import PropTypes, { element } from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors:PropTypes.array.isRequired,
  };

  createFrames = () => {
    let result = this.props.children;
    for (let i = 0; i < this.props.colors.length; i++) result = <div className='frame' style={{borderColor:this.props.colors[i]}}>{result}</div>;
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