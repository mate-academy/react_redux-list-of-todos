import { Dispatch, Action } from 'redux';

import {
  SET_IS_LOADING,
  SET_DATA_WAS_LOADED,
  SET_SORT_OPTION,
  LOAD_DATA,
  DELETE_TODO,
} from './types';

import {
  IsLoadingAction,
  SortOptionAction,
  SortOption,
  TodosAction,
} from '../constants/types';

import { getTodos } from '../utils/helpers';

export const setIsLoading = (isLoading: boolean): IsLoadingAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setDataWasLoaded = (): Action => ({
  type: SET_DATA_WAS_LOADED,
});

export const setSortOption = (option: SortOption): SortOptionAction => ({
  type: SET_SORT_OPTION,
  payload: option,
});

export const loadData = () => {
  return async (dispatch: Dispatch) => {
    const todos = await getTodos();

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
