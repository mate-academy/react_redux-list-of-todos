// import { Todo } from '../react-app-env';
import { getData } from './api';
import { ENDPOINTS } from './api.constants';

export const getTodos = (): Promise<Todo[]> => getData<Todo[]>(ENDPOINTS.todos);
