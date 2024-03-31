import { Todo } from '../types/Todo';

// we use string literal as a type to avoid mistype in future
type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

// payload is a typical name for an action data
type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: Todo;
};

// Action creator return type protect us from a mistype
const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todo: Todo): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todo,
});

// These actions will be used in the application
export const actions = { setTodo, removeTodo };

type State = DefaultValue;
// type Action = SetTodoAction | RemoveTodoAction;
type Action = {
  type: string;
  payload: Todo;
};

type DefaultValue = {
  CurTodo: Todo | null;
};

const AddTodo = 'currentTodo/SET';
const RemoveTodo = 'currentTodo/REMOVE';

const defaultValue: DefaultValue = {
  CurTodo: null,
};

const currentTodoReducer = (state: State = defaultValue, action: Action) => {
  switch (action.type) {
    case AddTodo:
      return { ...state, CurTodo: action.payload };
    case RemoveTodo:
      return { ...state, CurTodo: null };
    default:
      return state;
  }
};

export default currentTodoReducer;
