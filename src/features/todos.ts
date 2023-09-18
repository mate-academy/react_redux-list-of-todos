import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/Set',
  payload: Todo[]
};

const SetTodos = (value: Todo[]): SetTodoAction => ({
  type: 'todos/Set',
  payload: value,
});

export const actions = { SetTodos };

const initialValue :Todo[] = [];

const todosReducer = (
  todos = initialValue,
  action: SetTodoAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/Set':

      return [...todos, ...action.payload];

    default:
      return todos;
  }
};

export default todosReducer;
