import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'set';
  payload: Todo[];
};

const setTodos = (value: Todo[]): SetTodosAction => ({
  type: 'set',
  payload: value,
});
// eslint-disable-next-line
const todosReducer = (todos = [], action: SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'set':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = { setTodos };
export default todosReducer;
