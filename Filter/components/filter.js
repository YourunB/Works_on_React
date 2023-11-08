import React from 'react';

import './filter.css';
class Filter extends React.Component {

  state = {
    checked:false,
    find:'',
    arr:this.props.arrInit.slice(0),
  };

  workCode = () => {
    //this.setState( {arr:(this.state.checked === true) ? this.props.arrInit.filter((word) => word.includes(this.state.find)).sort().slice(0) : this.props.arrInit.filter((word) => word.includes(this.state.find))} )
    let result = this.props.arrInit.slice(0);
    if (this.state.find) result = result.filter((word) => word.includes(this.state.find));
    if (this.state.checked) result.sort();
    this.setState( {arr:result.slice(0)} );
  }

  reset = () => {
    this.setState( {
      checked:false,
      find:'',
      arr:this.props.arrInit.slice(0),
    } );
  }

  changeSort = () => {
    this.setState( {checked:event.target.checked}, () => {this.workCode()} );
  }

  changeFilter = () => {
    this.setState( {find:event.target.value}, () => {this.workCode()} );
  }
  
  render() {

    return (
      <div className='container'>

        <header>
          <input type='checkbox' checked={this.state.checked} onChange={this.changeSort} id='checkbox-sort'></input><label htmlFor='checkbox-sort'></label><div>&#8693;</div>
          <input type="text" value={this.state.find} onChange={this.changeFilter}/>
          <button onClick={this.reset}>Reset</button>
        </header>

        <main>
          <textarea value={this.state.arr.join('\n')} onChange={this.filter} disabled></textarea>
        </main>

      </div>
    );
  }

}

export default Filter;