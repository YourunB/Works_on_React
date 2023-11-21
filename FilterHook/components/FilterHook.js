import React, { useState, useEffect } from 'react';

import "./FilterHook.css";

export default props => {

  const [arr, setArr] = useState(props.arrInit);
  const [checked, setChecked] = useState(false);
  const [find, setFind] = useState('');

  function workCode() {
    let result = props.arrInit.slice(0);
    if (find) result = result.filter((word) => word.includes(find));
    if (checked) result.sort();
    setArr(result.slice(0));
  }

  function reset() {
    setChecked(false);
    setFind('');
  }

  function changeSort() { (checked === false) ? setChecked(true) : setChecked(false);  }
  function changeFilter() { setFind(event.target.value); }

  useEffect( () => { workCode(); }, [checked, find] ); //при каждом изменении checked и find будет выбполняться ф-ция workCode

  return (
    <div className='container'>

      <header>
        <input type='checkbox' checked={checked} onChange={changeSort} id='checkbox-sort'></input><label htmlFor='checkbox-sort'></label><span>&#8693;</span>
        <input value={find} onChange={changeFilter} type="text"/>
        <button onClick={reset}>Reset</button>
      </header>

      <main>
        <textarea value={arr.join('\n')} disabled rows={10}></textarea>
      </main>

    </div>
  );
};
