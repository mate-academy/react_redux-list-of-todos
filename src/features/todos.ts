import { Todo } from '../types/Todo';

const SET = 'todos/SET';

type SetTodosAction = { type: typeof SET; payload: Todo[] };
const set = (todosValue: Todo[]): SetTodosAction => ({
  type: SET,
  payload: todosValue,
});

export const actions = { set };

type Action = SetTodosAction;

const todosReducer = (todos: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case SET:
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
