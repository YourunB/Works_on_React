import React, { useState } from 'react';

import "./FilterHook.css";

import FilterControls from './FilterControls';
import FilterResult from './FilterResult';

export default props => {

  const [arr, setArr] = useState(props.arrInit);

  function workCode(find, checked) {
    let result = props.arrInit.slice(0);
    if (find) result = result.filter((word) => word.includes(find));
    if (checked) result.sort();
    setArr(result.slice(0));
  }

  return (
    <div className='container'>

      <FilterControls workCode = {workCode}/>
      <FilterResult arr = {arr}/>

    </div>
  );
};
