import { Todo } from '../types/Todo';

type SetTodosAction = {
  type:'todos/set';
  payload : Todo[];
};

const setTodos = (todo:Todo[]): SetTodosAction => ({
  type: 'todos/set',
  payload: todo,

});

export const actions = { setTodos };

const todosReducer = (todo : Todo[] = [], action:SetTodosAction): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;
    default:
      return todo;
  }
};

export default todosReducer;
