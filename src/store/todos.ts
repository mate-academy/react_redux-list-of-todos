import { AnyAction } from 'redux';
import { Todo } from '../types/Todo';
import { Option } from '../types/enums';

const SET_TODOS = 'SET_TODOS';
const RANDOMIZE = 'RANDOMIZE';

export type TodosState = {
  todos: Todo[],
  selectedOption: Option,
};

export const selectors = {
  getTodos: (state: TodosState) => state.todos,
};

export const actions = {
  setTodos: (todos: Todo[]) => ({ type: SET_TODOS, todos }),
  randomize: () => ({ type: RANDOMIZE }),
};

const initialState: TodosState = {
  todos: [],
  selectedOption: Option.ALL,
};

const todosReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case RANDOMIZE:
    {
      const randomizedArray = [...state.todos];
      let currentIndex = randomizedArray.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [randomizedArray[currentIndex], randomizedArray[randomIndex]]
          = [randomizedArray[randomIndex], randomizedArray[currentIndex]];
      }

      return {
        ...state,
        todos: randomizedArray,
      };
    }

    default:
      return state;
  }
};

export default todosReducer;
