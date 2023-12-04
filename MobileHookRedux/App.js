import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store'

import MobileCompany from './components/MobileCompany';

let clientsArr=[ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:-180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:220},
];

ReactDOM.render(
  <Provider store={store}>
      <MobileCompany clients={clientsArr} />
  </Provider>, document.getElementById('container')
  );

