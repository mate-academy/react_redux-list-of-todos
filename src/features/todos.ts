import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todo/SET';
  payload: Todo;
};

type RemoveTodoAction = {
  type: 'todo/REMOVE';
  payload: number;
};

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'todo/SET',
  payload: todo,
});

const removeTodo = (id: number): RemoveTodoAction => ({
  type: 'todo/REMOVE',
  payload: id,
});

export const actions = { setTodo, removeTodo };

type State = Todo[];
type Action = SetTodoAction | RemoveTodoAction;

const initialState: State = [];

const todosReducer = (state: State = initialState, action: Action): Todo[] => {
  switch (action.type) {
    case 'todo/SET':
      return [...state, action.payload];

    case 'todo/REMOVE':
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

export default todosReducer;
