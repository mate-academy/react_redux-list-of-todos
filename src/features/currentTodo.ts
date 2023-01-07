import { Todo } from '../types/Todo';
// eslint-disable-next-line import/no-cycle
import { TodoActions } from '../app/store';

type RemoveTodoAction = { type: TodoActions.Remove };

type SetTodoAction = {
  type: TodoActions.Set;
  payload: Todo;
};

const removeTodo = (): RemoveTodoAction => ({ type: TodoActions.Remove });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: TodoActions.Set,
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
    case TodoActions.Set:
      return {
        ...action.payload,
      };

    case TodoActions.Remove:
      return {
        id: 0,
        title: '',
        completed: false,
        userId: 0,
      };

    default:
      return state;
  }
};

export default currentTodoReducer;
