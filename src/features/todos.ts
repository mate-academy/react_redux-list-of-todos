import { Todo } from '../types/Todo';
import { TodosActionTypes } from '../types/TodosActionTypes';

type SetAction = { type: TodosActionTypes.SET, payload: Todo[] };
type AddAction = { type: TodosActionTypes.ADD, payload: Todo };
type RemoveAction = { type: TodosActionTypes.REMOVE, payload: Todo };

const setTodos = (todos: Todo[]): SetAction => ({
  type: TodosActionTypes.SET,
  payload: todos,
});
const addTodo = (todo: Todo): AddAction => ({
  type: TodosActionTypes.ADD,
  payload: todo,
});
const removeTodo = (todo: Todo): RemoveAction => ({
  type: TodosActionTypes.REMOVE,
  payload: todo,
});

  type State = Todo[];
  type Action = SetAction | AddAction | RemoveAction;

const todosReducer = (state: State = [], action: Action): Todo[] => {
  const { type, payload } = action;

  switch (type) {
    case TodosActionTypes.SET:
      return [...payload];
    case TodosActionTypes.ADD:
      return [...state, payload];
    case TodosActionTypes.REMOVE:
      return state.filter(todo => todo.id !== payload.id);
    default:
      return state;
  }
};

export const actions = { setTodos, addTodo, removeTodo };
export default todosReducer;
