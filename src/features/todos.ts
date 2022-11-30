import { Todo } from '../types/Todo';
// import { dataFromServer } from '../myLocalServer';

type SetTodos = {
  type: 'todos/SET',
  payload: Todo[]
};

const setTodos = (todos: Todo[]): SetTodos => ({
  type: 'todos/SET',
  payload: todos,
});

// почему на : Todo[] ругается если в state тоже Todo[] и в payload тоже Todo[]
// когда пытался вернуть   return [...state, action.payload]; хотел все разом в один масив ставить
const todosReducer = (state: Todo[] = [], action: SetTodos): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;
