import { createStore } from 'redux';

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ROW':
      return {
        ...state,
        todosAndUsers: action.todosAndUsers,
      };
    default:
      return state;
  }
};

const todosAndUsers = [[], []];

const initialState = {
  todosAndUsers,
};

const store = createStore(rootReducer, initialState);

export default store;
