export type RootState = {
  todos: TODO[] | [];
  userInfo: TODO | {},
  todosSelector: string,
  userError: boolean,
  isUserSelected: boolean,
  isTodoError: boolean,
  query: string,
};

export type TODO = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string,
}

export type USER = {
  id?: number,
  name?: string,
  username?: string,
  email?: string,
  phone?: string,
  website?: string,
  createdAt?: string,
  updatedAt?: string,
}


export type TodoProps = {
  todo: TODO,
}

export type ErrorWarningProps = {
  data: string;
  solution: string,
};
