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

  splitTags = () => {
    let tag = <br></br>
    let arrNoTags = this.state.text.split('<br>').join(' ').split('<br/>').join(' ').split(' ');
    let arrWithTags = [];

    for (let i = 0; i < arrNoTags.length; i++) {
      tag = <br key={i}></br>
      arrWithTags.push(arrNoTags[i]);
      if (i !== arrNoTags.length - 1) arrWithTags.push(tag);
    }

    return arrWithTags;
  }

  render() {

    return (
      <div className='box' >
        {this.splitTags()}
      </div>
    );
  }

}

export default Br2jsx;