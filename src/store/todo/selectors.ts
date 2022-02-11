import { State } from '../../react-app-env';

export const getStatusSelector = (state: State) => state.status;
export const getQuerySelector = (state: State) => state.query;
export const getTodosSelector = (state: State) => state.todos;
