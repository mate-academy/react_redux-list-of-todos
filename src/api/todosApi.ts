import { API_URL } from '../utils/constants';
import { TodoType } from '../utils/interfaces';
import { getData } from './getData';


export const getTodosFromServer = async (): Promise<TodoType[]> => {
  return getData<TodoType[]>(`${API_URL}/todos`);
};
