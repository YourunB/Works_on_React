import React from 'react';
import PropTypes, { element, func } from 'prop-types';

import './MobileCompany.css';

import MobileClient from './MobileClient';

import {clientEvents} from './events';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    clients: PropTypes.array.isRequired,
  };

  state = {
    clients: this.props.clients,
    sort: 'all',
    adding: false,
  };

  componentDidMount = () => {
    clientEvents.addListener('EclientEdit', this.clientEdit);
    clientEvents.addListener('EclientSave', this.clientSave);
    clientEvents.addListener('EclientDelete', this.clientDelete);
  };

  componentWillUnmount = () => {
    clientEvents.removeListener('EclientEdit', this.clientEdit);
    clientEvents.addListener('EclientSave', this.clientSave);
    clientEvents.addListener('EclientDelete', this.clientDelete);
  };

  clientEdit = (client) => {
    alert(client.fam);
  };

  clientSave = (client) => {
    const newClients = [...this.state.clients];

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
      this.setState( {clients: newClients} )

    } else {

      const newId = Math.max( ... newClients.map( client => client.id ) )+1

      const newClient = {
        id: newId,
        fam: this.famInput.value,
        im: this.imInput.value,
        otch: this.otchInput.value,
        balance: Number(this.balanceInput.value),
      }

      newClients.push(newClient);
      this.setState( {clients: newClients} )
    }

  };

  clientDelete = (client) => {
    const newClients = [...this.state.clients];
    const result = [];

    for (let i = 0; i < newClients.length; i++) if (newClients[i].id !== client.id) result.push(newClients[i]);
    this.setState( {clients: result} )
  }

  clientAdd = (bool) => {
    this.setState( {adding: bool} );
  }

  sortClients = (condition) => {
    if (this.state.sort !== condition) this.setState( {sort:condition} );
  }

  collectInfo = () => {
    if (this.famInput.value.trim() !== '' && this.imInput.value.trim() !== '' && this.otchInput.value.trim() !== '' && this.balanceInput.value.trim() !== '') {
      this.clientAdd(false);

      const addingClient = {
        fam: this.famInput.value,
        im: this.imInput.value,
        otch: this.otchInput.value,
        balance: Number(this.balanceInput.value),
      }

      this.clientSave(addingClient);
    } else alert('Введите корректную информацию !')
  }

  render() {

    const clientsCode=this.state.clients.map( el => {
        function resultClient (el) {
          let client=el;
          return <MobileClient
            client={client}
            key={el.id}
          />;
        }
        if (this.state.sort === 'all') return resultClient(el);
        if (this.state.sort === 'blocked' && el.balance < 0) return resultClient(el);
        if (this.state.sort === 'active' && el.balance > 0) return resultClient(el);
      }
    );

    const add = <tr>
      <td><input ref={element => this.famInput = element}></input></td>
      <td><input ref={element => this.imInput = element}></input></td>
      <td><input ref={element => this.otchInput = element}></input></td>
      <td><input type={'number'} ref={element => this.balanceInput = element}></input></td>
      <td></td>
      <td><button onClick={this.collectInfo}>Добавить</button></td>
      <td><button onClick={() => this.clientAdd(false)}>Отмена</button></td>
    </tr>

    return (
      <div className='MobileCompany'>
        <button onClick={ () => this.sortClients('all')}>Все</button><button onClick={ () => this.sortClients('active')}>Активные</button><button onClick={ () => this.sortClients('blocked')}>Заблокированные</button>
        <table>
          <thead><tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Баланс</th><th>Статус</th><th>Редактировать</th><th>Удалить</th></tr></thead>
          <tbody>
            {clientsCode}
            {(this.state.adding === true) ? add : null}
          </tbody>
        </table>
        <button onClick={() => this.clientAdd(true)}>Добавить клиента</button>
      </div>
    );

  }

}

export default MobileCompany;
