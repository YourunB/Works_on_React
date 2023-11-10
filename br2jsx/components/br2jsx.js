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
    let arrNoTags = this.state.text.split(/<.*?>/);
    let arrWithTags = [];
    
    for (let i = 0; i < arrNoTags.length; i++) {
      arrWithTags.push(arrNoTags[i]);
      if (i !== arrNoTags.length - 1) arrWithTags.push(<br key={i}></br>);
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