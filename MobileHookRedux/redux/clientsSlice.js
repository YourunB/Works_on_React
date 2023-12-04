import { createSlice } from '@reduxjs/toolkit';

const initialState={
  clientsArr: [ 
    {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
    {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
    {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:-180},
    {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:220},
  ],
  adding: false,
  sort: 'all',
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {

    updateClientSave: (state, action) => {
      if (action.payload.id !== undefined) { 
        for (let i = 0; i < initialState.clientsArr.length; i++) {
          if (initialState.clientsArr[i].id === action.payload.id) {
            state.clientsArr[i].fam = action.payload.fam;
            state.clientsArr[i].im = action.payload.im;
            state.clientsArr[i].otch = action.payload.otch;
            state.clientsArr[i].balance = action.payload.balance;
            state.adding = false;
          }
        }
      } else {
        const newId = Math.max(...initialState.clientsArr.map(client => client.id )) + 1;
        const newClient = {
          id: newId,
          fam: action.payload.fam,
          im: action.payload.im,
          otch: action.payload.otch,
          balance: Number(action.payload.balance),
        }
        state.adding = false;
        state.clientsArr.push(newClient);
      }
    },

    updateCollectInfo: (state, action) => {

    },

    updateClientAdd: (state, action) => { if (state.adding !== action.payload) state.adding = action.payload; },

    updateClientDelete: (state, action) => { for (let i = 0; i < initialState.clientsArr.length; i++) if (initialState.clientsArr[i].id === action.payload.id) state.clientsArr.shift(i); },

    updateSortClients: (state, action) => { if (state.sort !== action.payload) state.sort = action.payload; },
    
  },
});

export const { updateSortClients, updateClientDelete, updateClientAdd, updateCollectInfo, updateClientSave } = clientsSlice.actions;

export default clientsSlice.reducer;
