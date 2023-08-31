import { ThunkAction } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../app/store';
import { Todo } from '../types/Todo';

// type TodoPayload = {
//   todos: Todo[],
//   isLoading: boolean,
//   isError: boolean,
// };

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

// eslint-disable-next-line max-len
export const getTodos = (): ThunkAction<void, RootState, unknown, Action<any>> => {
  return dispatch => {
    // eslint-disable-next-line max-len
    fetch('https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json')
      .then(response => dispatch({
        type: 'todos/SET',
        payload: {
          todos: response,
          // isLoading: false,
          // isError: false,
        },
      }));
  };
};

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

export const actions = { setTodos };

const todosReducer = (
  state: Todo[],
  action: SetTodosAction,
): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return [...action.payload];
    default:
      return [...state];
  }
};

export default todosReducer;
