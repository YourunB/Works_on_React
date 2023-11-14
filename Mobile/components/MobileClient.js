import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';

import {clientEvents} from './events';

class MobileClient extends React.PureComponent {

  static propTypes = {
    client: PropTypes.object.isRequired,
  };

  state = {
    editing: false,
  };

  clientEdit = eo => {
    this.setState( {editing: true} )
    clientEvents.emit('EclientEdit', this.props.client);
  };

  clientSave = eo => {
    if (this.famInput.value.trim() !== '' && this.imInput.value.trim() !== '' && this.otchInput.value.trim() !== '' && this.balanceInput.value.trim() !== '') {

      this.setState( {editing: false} );
      
      const editingClient = {
        id: this.props.client.id,
        fam: this.famInput.value,
        im: this.imInput.value,
        otch: this.otchInput.value,
        balance: Number(this.balanceInput.value),
      }

      clientEvents.emit('EclientSave', editingClient);

    } else alert('Введите корректные данные !')
  }

  clientDelete = eo => {
    if ( confirm('Удалить информацию о клиенте ?') ) clientEvents.emit('EclientDelete', this.props.client);
  }

  render() {

    console.log(this.props.client)
    
    return (
      <tr>
        <td>{(this.state.editing === false) ? this.props.client.fam : <input ref={element => this.famInput = element} defaultValue={this.props.client.fam}></input>}</td>
        <td>{(this.state.editing === false) ? this.props.client.im : <input ref={element => this.imInput = element} defaultValue={this.props.client.im}></input>}</td>
        <td>{(this.state.editing === false) ? this.props.client.otch : <input ref={element => this.otchInput = element} defaultValue={this.props.client.otch}></input>}</td>
        <td>{(this.state.editing === false) ? this.props.client.balance : <input ref={element => this.balanceInput = element} defaultValue={this.props.client.balance} type='number'></input>}</td>
        <td style={(this.props.client.balance < 0) ? {backgroundColor: 'red'} : {backgroundColor: 'green'}}>{(this.props.client.balance < 0) ? 'blocked' : 'active'}</td>
        <td>{(this.state.editing === false) ? <button onClick={this.clientEdit}>Редактировать</button> : <button onClick={this.clientSave}>Сохранить</button>}</td>
        <td><button onClick={this.clientDelete}>Удалить</button></td>
      </tr>
    );

  }

}

export default MobileClient;
