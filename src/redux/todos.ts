import { AnyAction } from 'redux';
import { Options } from '../enums';

const RANDOMIZE = 'RANDOMIZE';
const SET_TODOS = 'SET_TODOS';
const SET_TITLE = 'SET_TITLE';

export type TodosState = {
  todos: Todo[];
  selectedOption: Options;
  searchTitle: string;
};

export const selectors = {
  getTodos: (state: TodosState) => state.todos,
};

export const actions = {
  setTodos: (todos: Todo[]) => ({ type: SET_TODOS, todos }),
  setTitle: (searchTitle: string) => ({ type: SET_TITLE, searchTitle }),
  randomize: () => ({ type: RANDOMIZE }),
};

const initialState: TodosState = {
  todos: [],
  selectedOption: Options.all,
  searchTitle: '',
};

const todosReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case RANDOMIZE:
    {
      const randomizedArr = state.todos.sort(
        () => {
          if (Math.random() > 0.5) {
            return 1;
          }

          return -1;
        },
      );

      return { ...state, todos: [...randomizedArr] };
    }

    case SET_TODOS:
      return { ...state, todos: action.todos };

    case SET_TITLE:
      return { ...state, searchTitle: action.searchTitle };

    default:
      return state;
  }
};

export default todosReducer;
