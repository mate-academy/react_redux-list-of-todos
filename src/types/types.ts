import { Status } from './Status';
import { Todo } from './Todo';

export type SetTodos = { type: 'todos/SET'; payload: Todo[] };
export type TodosAction = SetTodos;
export type TodosState = Todo[];

export type FilterAll = { type: 'filter/ALL'; payload: Status };
export type FilterCompleted = { type: 'filter/COMPLETED'; payload: Status };
export type FilterActive = { type: 'filter/ACTIVE'; payload: Status };
export type QueryFilter = { type: 'filter/QUERY'; payload: string };

export type Filter = { query: string; status: Status };
export type Action = FilterAll | FilterActive | FilterCompleted | QueryFilter;
