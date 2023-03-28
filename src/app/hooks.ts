import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Todo } from '../types/Todo';
import { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getLocalStorage = (key: string) => {
  if (localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  return null;
};

export const setLocalStorage = (key: string, data: Todo[] | Todo | string) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
