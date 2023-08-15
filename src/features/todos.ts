import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/set';
  payload: {
    initialArray: Todo[];
    filteredArray: Todo[];
  }
};

type SetFilteredTodos = {
  type: 'todos/filter';
  payload: {
    filteredArray: Todo[];
  }
};

const set = (data: Todo[]): SetTodos => ({
  type: 'todos/set',
  payload: {
    initialArray: data,
    filteredArray: data,
  },
});

const setFiltered = (newArray: Todo[]): SetFilteredTodos => ({
  type: 'todos/filter',
  payload: {
    filteredArray: newArray,
  },
});

type Action = SetTodos | SetFilteredTodos;

export const actions = { set, setFiltered };

type TodosState = {
  initialArray: Todo[];
  filteredArray: Todo[];
};

const initialState: TodosState = {
  initialArray: [],
  filteredArray: [],
};

const todosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'todos/set':
      return {
        ...state,
        ...action.payload,
      };

    case 'todos/filter':
      return {
        ...state,
        filteredArray: action.payload.filteredArray,
      };
    default:
      return state;
  }
};

export default todosReducer;
