import React, { } from 'react';

export default props => {

  return (
    <main>
      <textarea value={props.arr.join('\n')} disabled rows={10}></textarea>
    </main>
  );
};
