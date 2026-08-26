import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Status = 'all' | 'active' | 'completed';

interface FilterState {
  query: string;
  status: Status;
}

const initialState: FilterState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
  },
});

export const { setStatus, setQuery } = filterSlice.actions;

/*filterSlice = {
  name: 'filter', // просте поле
  reducer: function (state = { query: '', status: 'all' }, action) { // ключ який є функцією яка приймає state, яка з самого початку дорівнює initialState, та action
    switch (action.type) { // якщо action.type = 'filter/setStatus'
      case 'filter/setStatus':
        return { ...state, status: action.payload }; // то повертаємо об'єкт state, та змінюємо status на action.payload
      case 'filter/setQuery':
        return { ...state, query: action.payload }; // схожа по суті логіка
      default:
        return state;
    }
  },
  actions: { // ще одне значення в якому ховається об'єкт з функціями
    setStatus: function (payload) { // просто повертає потрібний тип та якесь значення  payload  -це об'єкт
      return { type: 'filter/setStatus', payload: payload };
    },
    setQuery: function (payload) {
      return { type: 'filter/setQuery', payload: payload };
    },
  },
} export const { setStatus, setQuery } = filterSlice.actions; // деструктуризація */
