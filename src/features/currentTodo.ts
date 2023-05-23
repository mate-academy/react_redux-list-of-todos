import { Reducer } from '../types/Reducer';
import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: Reducer.SET;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: Reducer.REMOVE });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: Reducer.SET,
  payload: todo,
});

export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
    case Reducer.SET:
      return action.payload;

    case Reducer.REMOVE:
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
