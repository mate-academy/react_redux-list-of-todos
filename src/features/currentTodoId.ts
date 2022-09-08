import { Maybe } from '../types/Maybe';

export enum TodoIdActionTypes {
  SetTodoId = 'currentTodo/setId',
  RemoveTodoId = 'currentTodo/removeId',
}

// we use string literal as a type to avoid mistype in future
type RemoveTodoIdAction = { type: TodoIdActionTypes.RemoveTodoId };

// payload is a typical name for an action data
type SetTodoIdAction = {
  type: TodoIdActionTypes.SetTodoId;
  payload: number;
};

// Action creator return type protect us from a mistype
const removeTodoId = (): RemoveTodoIdAction => (
  { type: TodoIdActionTypes.RemoveTodoId }
);

const setTodoId = (id: number): SetTodoIdAction => ({
  type: TodoIdActionTypes.SetTodoId,
  payload: id,
});

export const TODO_ID_ACTIONS_CREATOR = {
  setTodoId,
  removeTodoId,
};

type StateCurrentId = Maybe<number>;
type ActionCurrentId = SetTodoIdAction | RemoveTodoIdAction;

const currentTodoIdReducer = (
  state: StateCurrentId = null,
  action: ActionCurrentId,
): StateCurrentId => {
  switch (action.type) {
    case TodoIdActionTypes.SetTodoId:
      return action.payload;

    case TodoIdActionTypes.RemoveTodoId:
      return null;

    default:
      return state;
  }
};

export default currentTodoIdReducer;
