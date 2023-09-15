import { Todo } from '../types/Todo';

enum TodosActionTypes {
  ADD = 'todos/ADD',
  REMOVE = 'todos/REMOVE',
  SET = 'todos/SET',
}

type AddTodosAction = {
  type: TodosActionTypes.ADD,
  payload: Todo,
};

const add = (payload: Todo): AddTodosAction => ({
  type: TodosActionTypes.ADD,
  payload,
});

type RemoveTodosAction = {
  type: TodosActionTypes.REMOVE,
  payload: number,
};

const remove = (payload: number): RemoveTodosAction => ({
  type: TodosActionTypes.REMOVE,
  payload,
});

type SetTodosAction = {
  type: TodosActionTypes.SET,
  payload: Todo[],
};

const set = (payload: Todo[]): SetTodosAction => ({
  type: TodosActionTypes.SET,
  payload,
});

export const actions = { add, remove, set };

type Action = AddTodosAction | RemoveTodosAction | SetTodosAction;

const todosReducer = (
  state: Todo[] = [],
  action: Action,
): Todo[] => {
  switch (action.type) {
    case TodosActionTypes.SET:
      return action.payload;

    case TodosActionTypes.ADD:
      return [...state, action.payload];

    case TodosActionTypes.REMOVE:
      return state.filter(todo => todo.id !== action.payload);

    default:
      return state;
  }
};

export default todosReducer;
