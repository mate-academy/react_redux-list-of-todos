import { Todo } from '../types/Todo';

type SetAction = {
  type: 'currentTodos/SET';
  payload: Todo[];
};

const setTodo = (value: Todo[]): SetAction => ({
  type: 'currentTodos/SET',
  payload: value,
});

export const actions = { setTodo };

const todosReducer = (todos = [], action: SetAction): Todo[] => {
  switch (action.type) {
    case 'currentTodos/SET':
      return action.payload;
    default:
      return todos;
  }
};

export default todosReducer;
