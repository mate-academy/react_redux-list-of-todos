import { Todo } from '../types/Todo';

type SetTodos = { type: 'set', payload: Todo[] };
type LoadTodos = { type: 'load' };

type Actions = SetTodos | LoadTodos;

const set = (todosFromServer: Todo[]): SetTodos => (
  { type: 'set', payload: todosFromServer }
);

const load = (): LoadTodos => (
  { type: 'load' }
);

type InitialState = {
  todos: Todo[],
  load: boolean,
};

const initialState: InitialState = {
  todos: [],
  load: false,
};

// eslint-disable-next-line max-len
const todosReducer = (state: InitialState = initialState, action: Actions): InitialState => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        todos: action.payload,
        load: false,
      };
    case 'load':
      return {
        ...state,
        load: true,
      };
    default:
      return state;
  }
};

export const actions = { set, load };

export default todosReducer;
