import { Todo } from '../types/Todo';

type SetAddTodo = {
  type: 'SET_TODOS';
  payload: Todo[];
};

export const setTodo = (todos: Todo[]): SetAddTodo => ({
  type: 'SET_TODOS',
  payload: todos,
});

type Action = SetAddTodo;

const initialState: Todo[] = [];

const todoReducer = (state = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case 'SET_TODOS': {
      return action.payload;
    }

    default:
      return state;
  }
};

export const actions = { setTodo };
export default todoReducer;
