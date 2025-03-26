import { Todo } from '../types/Todo';

const SET_TODOS = 'todos/setTodos';

type SetTodosAction = { type: typeof SET_TODOS; payload: Todo[] };
type Action = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: SET_TODOS,
  payload: todos,
});

export const actions = {
  setTodos,
} as const;

type State = Todo[];

const initialState: State = [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_TODOS:
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
