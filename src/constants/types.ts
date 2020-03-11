import { Action } from 'redux';

export interface AppState {
  isLoading: boolean;
  todos: TodoWithUser[];
  dataWasLoaded: boolean;
  sortOption: SortOption;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface TodoWithUser extends Todo {
  user: User;
}

export type SortOption = 'title' | 'completeness' | 'name' | 'default';

export interface IsLoadingAction extends Action {
  payload: boolean;
}

export interface SortOptionAction extends Action {
  payload: string;
}

export interface LoadDataAction extends Action {
  payload: TodoWithUser[];
}

export interface DeleteTodoAction extends Action {
  payload: number;
}

export type TodosAction = LoadDataAction | DeleteTodoAction;
