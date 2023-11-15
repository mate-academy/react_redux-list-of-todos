import { Todo } from '../types/Todo';

type AddTodosAction = {
  type: 'todos/ADD';
  payload: Todo[] | Todo;
};

const addTodos = (todos: Todo[] | Todo): AddTodosAction => ({
  type: 'todos/ADD',
  payload: todos,
});

export const actions = { addTodos };

type Actions = AddTodosAction;

// made it with switch case so it was possible to scale (add possibility to remove todo etc.)
const todosReducer = (state: Todo[] = [], action: Actions): Todo[] => {
  switch (action.type) {
    case 'todos/ADD': {
      return Array.isArray(action.payload)
        ? [...state, ...action.payload]
        : [...state, action.payload];
    }

    default: {
      return state;
    }
  }
};

export default todosReducer;
