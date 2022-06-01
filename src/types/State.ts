import { ToDo } from './ToDo';
import { User } from './User';

export type State = {
  LoadingReducer: {
    loading: boolean,
    message: string,
  }
  TodosReducer: {
    todosFromServer: ToDo[],
    visibleTodos: ToDo[],
    user: User | null,
    userID: number,
    titleQuery: string,
    completeQuery: string,
    isRandomized: boolean,
    isLoadingError: boolean,
    isTodosSorted: boolean,
  }
};
