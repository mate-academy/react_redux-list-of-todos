import { Todo } from '../types/Todo';

type SetTodosAction = {
  type: 'todos/SET';
  payload: Todo[];
};

export enum TodosActionType {
  SetTodo = 'todos/SET',
}

type State = Todo[];

type Action = SetTodosAction;

const setTodos = (todos: Todo[]): SetTodosAction => ({
  type: 'todos/SET',
  payload: todos,
});

const initialState: State = [];

export const actions = { setTodos };

const todosReducer = (
  state: State = initialState,
  action: Action,
): Todo[] => {
  switch (action.type) {
    case TodosActionType.SetTodo:
      return action.payload;
    default:
      return state;
  }
};

export default todosReducer;
