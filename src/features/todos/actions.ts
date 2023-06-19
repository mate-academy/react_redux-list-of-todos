import { Todo } from '../../types/Todo';
import {
  AddAction,
  TodosActions,
  LoadedAction,
  ErrorAction,
} from './types';

const addTodos = (todos: Todo[]): AddAction => ({
  type: TodosActions.ADD,
  payload: todos,
});

const setIsLoaded = (isLoaded: boolean): LoadedAction => ({
  type: TodosActions.LOADED,
  payload: isLoaded,
});

const setIsError = (isError: boolean): ErrorAction => ({
  type: TodosActions.ERROR,
  payload: isError,
});

export const actions = { addTodos, setIsLoaded, setIsError };
