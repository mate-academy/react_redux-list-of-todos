import { createStore, AnyAction, Reducer } from 'redux';
import { actions } from './ActionTypes';

const reducer: Reducer = (state: Todo[] = [], action: AnyAction) => {
  switch (action.type) {
    case actions.SET_TODOS:
      return action.payload;

    case actions.SORT_BY_TITLE:
      return [...state].sort((a, b) => a.title.localeCompare(b.title));

    case actions.SORT_BY_STATUS:
      return [...state].sort((a, b) => Number(a.completed) - Number(b.completed));

    case actions.SORT_BY_USERNAME:
      return [...state].sort((a, b) => a.user.name.localeCompare(b.user.name));

    case actions.DELETE_ITEM:
      return [...state].filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export const store = createStore(reducer);
