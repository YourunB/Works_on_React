import React from 'react';
import ReactDOM from 'react-dom';

import RainbowFrame from './components/RainbowFrame.js';

ReactDOM.render( 
  <RainbowFrame  colors = {['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple']}>
    Hello!
  </RainbowFrame>,document.getElementById('container') );
