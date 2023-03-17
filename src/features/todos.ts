import { Todo } from '../types/Todo';

const SET = 'todos/SET';

type TodosAction = {
  type: typeof SET,
  payload: Todo[],
};

export const todosAction = (todos: Todo[]): TodosAction => ({
  type: SET,
  payload: todos,
});

const todosReducer = (todos: Todo[] = [], action: TodosAction): Todo[] => {
  switch (action.type) {
    case SET:
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
