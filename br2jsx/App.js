import React from 'react';
import ReactDOM from 'react-dom';

import Br2jsx from './components/br2jsx';

ReactDOM.render( 
  <Br2jsx
    text = 'первый<br>второй<br/>третий<br/>последний'
  />, document.getElementById('container') );
