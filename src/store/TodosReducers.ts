import { Todo } from '../react-app-env';

export type SetTodoList = {
  type: 'SET_TODOLIST',
  payload: Todo[],
};

export type ActionTodoList = (
  SetTodoList
);

export const TodosReducer = (
  todos: Todo[] = [],
  action: ActionTodoList,
): Todo[] => {
  switch (action.type) {
    case 'SET_TODOLIST':
      return action.payload;
    default:
      return todos;
  }
};

export const actions = {
  setTodos: (todos: Todo[]): SetTodoList => ({
    type: 'SET_TODOLIST',
    payload: todos,
  }),
};
