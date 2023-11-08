import React from 'react';
import PropTypes, { element } from 'prop-types';

import './br2jsx.css';

class Br2jsx extends React.Component {

  static propTypes = {
    text:PropTypes.string.isRequired,
  };

  state = {
    text: this.props.text,
  };

  divRef = null;

  splitTags = ref => {
    const container = document.createElement('div');
    container.innerHTML = this.state.text;
    ref.append(container);
  }

  render() {

    return (
      <div className='box' ref={this.splitTags}>
      </div>
    );
  }

}

export default Br2jsx;