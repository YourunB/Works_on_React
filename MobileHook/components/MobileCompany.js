import React, { useState, useEffect, useRef} from 'react';

import "./MobileCompany.css";

import MobileClient from './MobileClient';

import {clientEvents} from './events';

export default props => {

  const [clients, setClients] = useState(props.clients); //массив клиентов
  const [adding, setAdding] = useState(false); //добавление нового клиента
  const [sort, setSort] = useState('all'); //каких клиентов отображаем

  const inputFam = useRef(null);
  const inputIm = useRef(null); 
  const inputOtch = useRef(null); 
  const inputBalance = useRef(null); 

  useEffect( () => {
    clientEvents.addListener('EclientSave', clientSave);
    clientEvents.addListener('EclientEdit', clientEdit);
    clientEvents.addListener('EclientDelete', clientDelete);

    return() => { // отписываемся от событий
      clientEvents.removeListener('EclientSave', clientSave);
      clientEvents.removeListener('EclientEdit', clientEdit);
      clientEvents.removeListener('EclientDelete', clientDelete);
    }
  }, [clients] );

  function clientSave(client) {
    const newClients = [...clients];
    
    if (client.id !== undefined) {

      for (let i = 0; i < newClients.length; i++) {
        if (newClients[i].id === client.id) {
          const newClient = {...newClients[i]}
          newClient.fam = client.fam;
          newClient.im = client.im;
          newClient.otch = client.otch;
          newClient.balance = client.balance;
          newClients[i] = newClient;
        }
      }
     setClients(newClients)

    } else {

      const newId = Math.max( ... newClients.map( client => client.id ) )+1

      const newClient = {
        id: newId,
        fam: inputFam.current.value,
        im: inputIm.current.value,
        otch: inputOtch.current.value,
        balance: Number(inputBalance.current.value),
      }

      newClients.push(newClient);
      setClients(newClients)
    }

  }

  function clientEdit(client) {
    alert('Выбран для редактирования: ' + client.fam);
  }

  function clientDelete(client) {
    const newClients = [...clients];
    const result = [];

    for (let i = 0; i < newClients.length; i++) if (newClients[i].id !== client.id) result.push(newClients[i]);
    setClients(result)
  }

  function clientAdd(bool) {
    setAdding(bool);
  }

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

  function sortClients(condition) {
    if (sort !== condition) setSort(condition);
  }

  const clientsCode = clients.map( el => {
      let client = el;
      if ( sort === 'all' || (sort === 'blocked' && el.balance < 0) || (sort === 'active' && el.balance > 0) ) {
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
          {(adding === true) ? add : null}
        </tbody>
      </table>

      <button onClick={() => {clientAdd(true)}}>Добавить клиента</button>
    </div>
  );
};