import { Todo } from '../types/Todo';

type SetAddTodo = {
  type: 'ADD_TODO';
  payload: Todo;
};

export const addTodo = (todo: Todo): SetAddTodo => ({
  type: 'ADD_TODO',
  payload: todo,
});

type Action = SetAddTodo;

const initialState: Todo[] = [];

const todoReducer = (state = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO': {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};

export const actions = { addTodo };
export default todoReducer;
