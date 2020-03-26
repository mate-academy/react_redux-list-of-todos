import { API_URL } from '../constants/constants';
import { getData } from './getData';

export const getTodos = (): Promise<Todo[]> => getData<Todo[]>(`${API_URL}/todos`);
