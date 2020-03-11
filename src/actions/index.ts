import { Dispatch } from 'redux';

import {
  SET_IS_LOADING,
  SET_DATA_WAS_LOADED,
  SET_SORT_OPTION,
  LOAD_DATA,
  DELETE_TODO,
} from './types';

import {
  IsLoadingAction,
  DataWasLoadedAction,
  SortOptionAction,
  SortOption,
  TodosAction,
  Todo,
  User,
} from '../constants/types';

import {
  loadTodos,
  loadUsers,
} from '../utils/api';

export const setIsLoading = (isLoading: boolean): IsLoadingAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setDataWasLoaded = (): DataWasLoadedAction => ({
  type: SET_DATA_WAS_LOADED,
});

export const setSortOption = (option: SortOption): SortOptionAction => ({
  type: SET_SORT_OPTION,
  payload: option,
});

export const loadData = () => {
  return async (dispatch: Dispatch) => {
    const [initialTodos, initialUsers] = await Promise.all([
      loadTodos(),
      loadUsers(),
    ]);

    const todos = initialTodos.map((todo: Todo) => {
      return {
        ...todo,
        user: initialUsers.find(
          (currentUser: User) => currentUser.id === todo.userId,
        ) as User,
      };
    });

    dispatch<TodosAction>({
      type: LOAD_DATA,
      payload: todos,
    });
  };
};

export const deleteTodo = (id: number): TodosAction => ({
  type: DELETE_TODO,
  payload: id,
});
