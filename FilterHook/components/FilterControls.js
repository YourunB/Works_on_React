import React, { useState, useEffect } from 'react';

export default props => {

  const [checked, setChecked] = useState(false);
  const [find, setFind] = useState('');

  function changeSort() { (checked === false) ? setChecked(true) : setChecked(false);  }
  function changeFilter() { setFind(event.target.value); }

  function reset() {
    setChecked(false);
    setFind('');
  }

  useEffect( () => { props.workCode(find, checked); }, [checked, find] );

  return (
    <header>
      <input type='checkbox' checked={checked} onChange={changeSort} id='checkbox-sort'></input><label htmlFor='checkbox-sort'></label><span>&#8693;</span>
      <input value={find} onChange={changeFilter} type="text"/>
      <button onClick={reset}>Reset</button>
    </header>
  );
};
