import {EventEmitter} from 'events';

let clientEvents=new EventEmitter();
//EclientEdit - клиент выбран для редактирования
//EclientSave - сохранения изменений
//EclientDelete - удаление клиента

export {clientEvents};
