export enum ActionType {
  SET_INIT_TODOS = 'SET_INIT_TODOS',
  SET_ID = 'SET_ID',
  SET_SELECTED_ID = 'SET_SELECTED_ID',
  SET_VALUE_FILTER = 'SET_VALUE_FILTER',
  SET_VALUE_SELECT = 'SET_VALUE_SELECT',
  SET_RANDOMIZE = 'SET_RANDOMIZE',
  SET_USER = 'SET_USER',
}

export type Action = SetInitTodos | SetId | SetSelectedId
| SetValueFilter | SetValueSelect | SetRandomize | SetUser;

interface SetInitTodos {
  type: ActionType.SET_INIT_TODOS,
  value: Todo[],
}

interface SetId {
  type: ActionType.SET_ID,
  value: number,
}

interface SetSelectedId {
  type: ActionType.SET_SELECTED_ID,
  value: number,
}

interface SetValueFilter {
  type: ActionType.SET_VALUE_FILTER,
  value: string,
}

interface SetValueSelect {
  type: ActionType.SET_VALUE_SELECT,
  value: string,
}

interface SetRandomize {
  type: ActionType.SET_RANDOMIZE,
}

interface SetUser {
  type: ActionType.SET_USER,
  value: User | null,
}

export const setInitTodos = (value: Todo[]): SetInitTodos => (
  { type: ActionType.SET_INIT_TODOS, value }
);

export const setId = (value: number): SetId => (
  { type: ActionType.SET_ID, value }
);

export const setSelectedId = (value: number): SetSelectedId => (
  { type: ActionType.SET_SELECTED_ID, value }
);

export const setValueFilter = (value: string): SetValueFilter => (
  { type: ActionType.SET_VALUE_FILTER, value }
);

export const setValueSelect = (value: string): SetValueSelect => (
  { type: ActionType.SET_VALUE_SELECT, value }
);

export const setRandomize = (): SetRandomize => (
  { type: ActionType.SET_RANDOMIZE }
);

export const setUser = (value: User | null): SetUser => (
  { type: ActionType.SET_USER, value }
);
