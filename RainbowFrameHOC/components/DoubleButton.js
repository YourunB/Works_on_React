import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component {

  static propTypes = {
    caption1:PropTypes.string.isRequired,
    caption2:PropTypes.string.isRequired,
    children:PropTypes.array.isRequired,
    changeBtn:PropTypes.func.isRequired,
  };

  cbPressed = (n) => {
    this.props.changeBtn(n);
  }
  
  render() {

    return (
      <div>
        <button onClick={ () => this.cbPressed(1)}>{this.props.caption1}</button>
        {this.props.children}
        <button onClick={ () => this.cbPressed(2)}>{this.props.caption2}</button>
      </div>
    );
  }
  
}
  
export default DoubleButton;