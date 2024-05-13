import { TodoActionTypes } from '../types/Actions';
import { Todo } from '../types/Todo';

type AddTodosAction = { type: TodoActionTypes.addAll; payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodosAction => ({
  type: TodoActionTypes.addAll,
  payload: todos,
});

export const actions = { addTodos };

type State = Todo[] | [];

// eslint-disable-next-line @typescript-eslint/default-param-last
const todosReducer = (state: State = [], action: AddTodosAction): Todo[] => {
  switch (action.type) {
    case TodoActionTypes.addAll: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default todosReducer;
