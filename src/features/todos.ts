import { Todo } from '../types/Todo';

type SetAction = {
  type: 'todos/SET',
  payload: Todo[]
}

type Action = SetAction;

const setTodos = (todos: Todo[]): SetAction => ({
  type: 'todos/SET',
  payload: todos,
})

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = {setTodos};

export default todosReducer;
