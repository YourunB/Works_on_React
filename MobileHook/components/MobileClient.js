import React, { useState, useRef } from 'react';

import "./MobileClient.css";

import {clientEvents} from './events';

const MobileClient = props => {

  const [editing, setEditing] = useState(false);

  const inputFam = useRef(null);
  const inputIm = useRef(null); 
  const inputOtch = useRef(null); 
  const inputBalance = useRef(null); 

  function clientEdit() {
    setEditing(true);
    clientEvents.emit('EclientEdit', props.client);
  }

  function clientSave() {
    if (inputFam.current.value.trim() !== '' && inputIm.current.value.trim() !== '' && inputOtch.current.value.trim() !== '' && inputBalance.current.value.trim() !== '') {
      setEditing(false);

      const editingClient = {
        id: props.client.id,
        fam: inputFam.current.value,
        im: inputIm.current.value,
        otch: inputOtch.current.value,
        balance: Number(inputBalance.current.value),
      }

      clientEvents.emit('EclientSave', editingClient);
    }
  }

  function clientDelete() {
    if ( confirm('Удалить информацию о клиенте ?') ) clientEvents.emit('EclientDelete', props.client);
  }

  console.log(props.client);

  return (
    <tr>
      <td>{(editing === false) ? props.client.fam : <input ref={inputFam} defaultValue={props.client.fam}></input>}</td>
      <td>{(editing === false) ? props.client.im : <input ref={inputIm} defaultValue={props.client.im}></input>}</td>
      <td>{(editing === false) ? props.client.otch : <input ref={inputOtch} defaultValue={props.client.otch}></input>}</td>
      <td>{(editing === false) ? props.client.balance : <input ref={inputBalance} type={'number'} defaultValue={props.client.balance}></input>}</td>
      <td style={(props.client.balance >= 0) ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}>{(props.client.balance >= 0) ? 'active' : 'blocked'}</td>
      <td>{(editing === false) ? <button onClick={clientEdit}>Редактировать</button> : <button onClick={clientSave}>Сохранить</button>}</td>
      <td><button onClick={clientDelete}>Удалить</button></td>
    </tr>
  );
};

export default React.memo(MobileClient);