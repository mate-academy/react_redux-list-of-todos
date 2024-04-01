import { Todo } from '../types/Todo';

export const setTodos = (payload: Todo[]) => ({ type: 'AddTodos', payload });

interface Action {
  type: string;
  payload: Todo[];
}

type DefaultValue = {
  todos: Todo[];
};

const deaultValue: DefaultValue = {
  todos: [],
};
// eslint-disable-next-line
const todosReducer = (state = deaultValue, action: Action): DefaultValue => {
  switch (action.type) {
    case 'AddTodos':
      return { ...state, todos: [...state.todos, ...action.payload] };
    default:
      return state;
  }
};

export default todosReducer;
