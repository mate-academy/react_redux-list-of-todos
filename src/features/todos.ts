import { Todo } from '../types/Todo';

export enum TodosActionType {
  SET = 'todos/set',
}

type SetAction = { type: TodosActionType.SET, payload: Todo[] };

const set = (todos: Todo[]): SetAction => ({
  type: TodosActionType.SET,
  payload: todos,
});

export const actions = { set };

const todosReducer = (state: Todo[] = [], action: SetAction) => {
  if (action.type === TodosActionType.SET) {
    return action.payload;
  }

  return state;
};

export default todosReducer;
