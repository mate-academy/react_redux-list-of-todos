import { createStore } from 'redux';

const initialState = {
  prepearedTodoList: [],
  isLoaded: false,
};


const reducerTodo = (state: any, action: any) => {
  if (action.type === 'isLoaded') {
    return {
      ...state,
      isLoaded: action.value,
    };
  }

  if (action.type === 'prepearedTodoList') {
    return {
      ...state,
      prepearedTodoList: action.value,
    };
  }

  return state;
};

export const store = createStore(reducerTodo, initialState);
