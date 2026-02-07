import { Todo } from './Todo';
import { User } from './User';

export type ExtendedTodo = Todo & { user: User };
