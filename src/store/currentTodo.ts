import { Todo } from '../Types/Todo';

type RootState = Todo | null;

type SelectTask = {
  type: 'currentTodo/SelectTask',
  payload: Todo,
};

type RemoveTask = {
  type: 'currentTodo/RemoveTask'
};

type Action = RemoveTask | SelectTask;

export const todoActions = {
  SelectTask: (todo: Todo) => (
    {
      type: 'currentTodo/SelectTask',
      payload: todo,
    }),
  RemoveTask: () => ({ type: 'currentTodo/RemoveTask' }),
};

const initialState: RootState = null;

const currentTodoReducer = (
  state = initialState,
  action: Action,
): RootState => {
  switch (action.type) {
    case 'currentTodo/SelectTask':
      return action.payload;

    case 'currentTodo/RemoveTask':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
