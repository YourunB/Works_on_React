import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/filter.js';

ReactDOM.render( 
  <Filter
    arrInit={['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate']}
  />, document.getElementById('container') );
