// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Todo {
  id:number,
  userId:number,
  title:string,
  completed:false,
}

export interface State {
  todos: Todo[],
  user: User | null,
}

export interface User {
  id:number,
  name:string,
  username:string,
  email:string,
  phone:string,
  website:string
}
