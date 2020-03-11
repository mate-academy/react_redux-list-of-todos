import { createStore, AnyAction } from 'redux';

const reducer = (state: Todo[] = [], action: AnyAction) => {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;

    case 'SORT_BY_TITLE':
      return [...state].sort((a, b) => a.title.localeCompare(b.title));

    case 'SORT_BY_STATUS':
      return [...state].sort((a, b) => Number(a.completed) - Number(b.completed));

    case 'SORT_BY_USERNAME':
      return [...state].sort((a, b) => a.user.name.localeCompare(b.user.name));

    case 'DELETE_ITEM':
      return [...state].filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export const store = createStore(reducer);
