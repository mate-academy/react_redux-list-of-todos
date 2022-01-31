import { Todo } from './Todo';
import { User } from './User';

export type RootState = {
  todosReducer: {
    todos: Todo[],
    visibleTodos: Todo[],
  },
  userInfoReducer: {
    user: User,
  },
};
