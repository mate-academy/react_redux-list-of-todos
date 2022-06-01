import { State } from '../../types/State';

export const getTodosSelector = (state: State) => {
  return state.TodosReducer.todosFromServer;
};

export const getVisibleTodosSelector = (state: State) => {
  return state.TodosReducer.visibleTodos;
};

export const getUserSelector = (state: State) => state.TodosReducer.user;

export const getSelectedIDSelector = (state: State) => {
  return state.TodosReducer.userID;
};

export const getTitleQuerySelector = (state: State) => {
  return state.TodosReducer.titleQuery;
};

export const getCompleteQuerySelector = (state: State) => {
  return state.TodosReducer.completeQuery;
};

export const getIsRandomizedSelector = (state: State) => {
  return state.TodosReducer.isRandomized;
};

export const getIsLoadingErrorSelector = (state: State) => {
  return state.TodosReducer.isLoadingError;
};

export const getIsTodosSortedSelector = (state: State) => {
  return state.TodosReducer.isTodosSorted;
};
