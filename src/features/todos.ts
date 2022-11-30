import { Todo } from '../types/Todo';
import { dataFromServer } from '../myLocalServer';

export const actions = {};

const todosReducer = (): Todo[] => {
  return dataFromServer;
};

export default todosReducer;
