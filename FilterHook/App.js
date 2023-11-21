import React from 'react';
import ReactDOM from 'react-dom';

import FilterHook from './components/FilterHook';

ReactDOM.render(
  <FilterHook
    arrInit={['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate']}
  />, document.getElementById('container')
  );

