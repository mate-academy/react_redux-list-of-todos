import { Dispatch } from 'redux';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

// const initialState = {
//   todos: [],
//   isLoading: false,
// };

// type StartLoadingAction = {
//   type: 'loading/START'
//   payload: boolean,
// };

// type FinishLoadingAction = {
//   type: 'loading/FINISH'
//   payload: boolean,
// };

// const startLoadingActionCreator = ():StartLoadingAction => ({
//   type: 'loading/START',
//   payload: true,
// });

// const finishLoadingActionCreator = ():FinishLoadingAction => ({
//   type: 'loading/FINISH',
//   payload: false,
// });

type GetTodosAction = {
  type: 'todos/GET',
  payload: Todo[],
};

const getTodosActionCreator = (todos: Todo[]): GetTodosAction => ({
  type: 'todos/GET',
  payload: todos,
});

const loadTodosFromServerAction = async (
  dispatch: Dispatch<GetTodosAction>,
) => {
  const todos = await getTodos();

  dispatch(getTodosActionCreator(todos));
};

export const TODOS_ACTIONS = {
  getTodos: getTodosActionCreator,
  loadTodos: loadTodosFromServerAction,
};

type State = Todo[];
type Action = GetTodosAction;

const todosReducer = (
  todosState: State = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case 'todos/GET':
      return action.payload;

    default:
      return todosState;
  }
};

export default todosReducer;
