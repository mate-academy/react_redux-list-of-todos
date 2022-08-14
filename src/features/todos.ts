import { Todo } from '../types/Todo';

type State = {
  loaded: boolean;
  items: Todo[];
};
const initialState: State = {
  loaded: false,
  items: [],
};

type SetTodosAction = {
  type: 'todos/set',
  payload: Todo[],
};

type StartTodosLoadingAction = {
  type: 'todos/startLoading',
};

type FinishTodosLoadingAction = {
  type: 'todos/finishLoading',
};

type Action = (
  SetTodosAction
  | StartTodosLoadingAction
  | FinishTodosLoadingAction
);

const todosReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/set':
      return {
        ...state,
        items: action.payload,
      };

    case 'todos/startLoading':
      return {
        ...state,
        loaded: false,
      };

    case 'todos/finishLoading':
      return {
        ...state,
        loaded: true,
      };

    default:
      return state;
  }
};

export const todosActions = {
  setTodos: (todos: Todo[]): SetTodosAction => ({
    type: 'todos/set',
    payload: todos,
  }),
  startLoading: (): StartTodosLoadingAction => ({ type: 'todos/startLoading' }),
  finishLoading: (): FinishTodosLoadingAction => ({ type: 'todos/finishLoading' }),
};

export default todosReducer;
