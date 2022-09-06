import { Todo } from '../Types/Todo';

type RootState = Todo | null;

type SelectTask = {
  type: 'SelectTask',
  payload: Todo,
};

type RemoveTask = {
  type: 'RemoveTask'
};

type Action = RemoveTask | SelectTask;

export const todoActions = {
  SelectTask: (todo: Todo) => ({ type: 'SelectTask', payload: todo }),
  RemoveTask: { type: 'RemoveTask' },
};

const initialState: RootState = null;

const currentTodoReducer = (
  state = initialState,
  action: Action,
): RootState => {
  switch (action.type) {
    case 'SelectTask':
      return action.payload;

    case 'RemoveTask':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
