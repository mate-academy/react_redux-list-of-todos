import { getTodos, deleteTodo } from '../scripts/api';

export const LOAD = 'todos/load';
export const DELETE = 'todos/delete';
export const ADD = 'todos/add';
export const UPDATE = 'todos/update';

export const actions = {
  [LOAD]: () => (dispatch) => {
    getTodos()
      .then((todos) => {
        dispatch(actions[ADD](todos));
      });
  },

  [DELETE]: (id) => (dispatch) => {
    deleteTodo(id)
      .then(() => {
        dispatch(actions[UPDATE](id));
      });
  },

  [ADD]: (value) => ({ type: ADD, value }),
  [UPDATE]: (id) => ({ type: UPDATE, id }),
};

const todosReducer = (todos = [], action) => {
  switch (action.type) {
    case ADD:
      const { value } = action;

      if (Array.isArray(value)) {
        return [...todos, ...value];
      }

      return [...todos, value];

    case UPDATE:
      return todos.filter(({ id }) => id !== action.id);
  
    default:
      return todos;
  }
}

export default todosReducer;
