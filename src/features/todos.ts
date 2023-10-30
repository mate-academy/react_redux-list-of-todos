import { Todo } from '../types/Todo';

type State = {
  allTodos: Todo[];
  visibleTodos: Todo[];
};

type SetAllTodosAction = {
  type: 'todos/SET_All';
  payload: Todo[];
};

type SetVisibleTodosAction = {
  type: 'todos/SET_VISIBLE';
  payload: Todo[];
};

type Actions = SetAllTodosAction | SetVisibleTodosAction;

const setAllTodos = (payload: Todo[]): SetAllTodosAction => ({
  type: 'todos/SET_All',
  payload,
});

const setVisibleTodos = (payload: Todo[]): SetVisibleTodosAction => ({
  type: 'todos/SET_VISIBLE',
  payload,
});

const initialState: State = {
  allTodos: [],
  visibleTodos: [],
};

const todosReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'todos/SET_All': {
      return {
        ...state,
        allTodos: action.payload,
      };
    }

    case 'todos/SET_VISIBLE': {
      return {
        ...state,
        visibleTodos: action.payload,
      };
    }

    default:
      return state;
  }
};

export const actions = { setAllTodos, setVisibleTodos };
export default todosReducer;
