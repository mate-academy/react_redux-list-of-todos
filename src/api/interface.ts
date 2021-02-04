export type InitialUserStateT = {
  pending: boolean;
  user: USERTYPE;
  selectedUserId: number;
  error: null | string;
};

export type InitialTodosStateT = {
  pending: boolean;
  todos: TODOSTYPE[];
  error: null | string;
  selectedTodoId: number;
  query: string;
  filteringType: string;
};

export interface TODOSTYPE {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface USERTYPE {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface RooTStateT {
  todosState: InitialTodosStateT;
  userState: InitialUserStateT;
}
