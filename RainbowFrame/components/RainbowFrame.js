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

  render() {

    let frame = '';

    this.state.colors.forEach(element => {frame = frame + `<div class='frame' style='border:solid 4px ${element}'>`});
    frame = frame + `<p class='frame__text'>${this.state.text}</p>`;
    this.state.colors.forEach(element => {frame = frame + '</div>'});

    return (
      <div dangerouslySetInnerHTML={{__html: frame}}>
  
      </div>
    );
  }

}

export default RainbowFrame;