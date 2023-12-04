import React, { useState, useEffect, useRef} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { updateSortClients, updateClientDelete, updateClientAdd, updateCollectInfo, updateClientSave } from "../redux/clientsSlice.js";

import "./MobileCompany.css";
import MobileClient from './MobileClient';
import {clientEvents} from './events';

export default props => {

  const dispatch = useDispatch();
  const clientsRedux = useSelector( state => state.clients ); 

  const inputFam = useRef(null);
  const inputIm = useRef(null); 
  const inputOtch = useRef(null); 
  const inputBalance = useRef(null); 

  useEffect( () => {
    clientEvents.addListener('EclientSave', clientSave);
    clientEvents.addListener('EclientEdit', clientEdit);
    clientEvents.addListener('EclientDelete', clientDelete);

    return() => {
      clientEvents.removeListener('EclientSave', clientSave);
      clientEvents.removeListener('EclientEdit', clientEdit);
      clientEvents.removeListener('EclientDelete', clientDelete);
    }
  }, [clientsRedux] );

  function clientDelete(client) { dispatch(updateClientDelete(client)); }
  function clientSave(client) { dispatch(updateClientSave(client)); }
  function clientAdd(bool) { dispatch(updateClientAdd(bool)); }
  function sortClients(condition) { dispatch(updateSortClients(condition)); }
  function clientEdit(client) { alert('Выбран для редактирования: ' + client.fam); }

  function collectInfo() {
    if (inputFam.current.value.trim() !== '' && inputIm.current.value.trim() !== '' && inputOtch.current.value.trim() !== '' && inputBalance.current.value.trim() !== '') {
      clientAdd(false);
      const addingClient = {
        fam: inputFam.current.value,
        im: inputIm.current.value,
        otch: inputOtch.current.value,
        balance: Number(inputBalance.current.value),
      }
      clientSave(addingClient);
    } else alert('Введите корректную информацию !')
  }

  const clientsCode = clientsRedux.clientsArr.map( el => {
      let client = el;
      if ( clientsRedux.sort === 'all' || (clientsRedux.sort === 'blocked' && el.balance < 0) || (clientsRedux.sort === 'active' && el.balance > 0) ) {
      return <MobileClient
        client={client}
        key={el.id}
      />;
    }
  });

    const add = <tr>
      <td><input ref={inputFam}></input></td>
      <td><input ref={inputIm}></input></td>
      <td><input ref={inputOtch}></input></td>
      <td><input type={'number'} ref={inputBalance}></input></td>
      <td></td>
      <td><button onClick={collectInfo}>Добавить</button></td>
      <td><button onClick={() => {clientAdd(false)}}>Отмена</button></td>
    </tr>

  return (
    <div className='MobileCompany'>
      <button onClick={() => {sortClients('all')}}>Все</button><button onClick={() => {sortClients('active')}}>Активные</button><button onClick={() => {sortClients('blocked')}}>Заблокированные</button>
      
      <table>
        <thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Баланс</th><th>Статус</th><th>Редактировать</th><th>Удалить</th></tr></thead>
        <tbody>
          {clientsCode}
          {(clientsRedux.adding === true) ? add : null}
        </tbody>
      </table>

      <button onClick={() => {clientAdd(true)}}>Добавить клиента</button>
    </div>
  );
};