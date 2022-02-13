import { State } from '../react-app-env';

export const getTodosSelector = (state: State) => state.todos;
export const getUserSelector = (state: State) => state.user;
export const getInputValue = (state: State) => state.inputValue;
export const getSelectValue = (state: State) => state.selectValue;
export const getSelectedUserId = (state: State) => state.selectedUserId;
