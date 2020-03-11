import { createStore, Action, Reducer } from 'redux';

const initialState = {
  prepearedTodoList: [],
  isLoaded: false,
};

interface ReducerTodoState {
  prepearedTodoList: TodoWithUser[] | [];
  isLoaded: boolean;
}

enum ActionType {
  IsLoaded = 'isLoaded',
  PrepearedTodoList = 'prepearedTodoList',
}

interface StoreAction extends Action<ActionType>{
  value: Partial<ReducerTodoState>;
}

const reducerTodo: Reducer<ReducerTodoState, any> = (
  state = initialState, action,
) => {
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

export const store: any = createStore<ReducerTodoState, StoreAction, null, null>(reducerTodo);
