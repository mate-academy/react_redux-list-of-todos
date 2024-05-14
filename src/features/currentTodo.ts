import { TodoActionTypes } from '../types/Actions';
import { Todo } from '../types/Todo';

type RemoveTodoAction = { type: TodoActionTypes.remove };

// payload is a typical name for an action data
type SetTodoAction = {
  type: TodoActionTypes.set;
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: TodoActionTypes.remove });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TodoActionTypes.set,
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = Todo | null;
type Action = SetTodoAction | RemoveTodoAction;

// eslint-disable-next-line @typescript-eslint/default-param-last
const currentTodoReducer = (state: State = null, action: Action): State => {
  switch (action.type) {
    case TodoActionTypes.set: {
      return action.payload;
    }

    case TodoActionTypes.remove: {
      return null;
    }

    default:
      return state;
  }
};

export default currentTodoReducer;
