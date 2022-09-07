type RemoveTodoAction = { type: 'currentTodo/REMOVE' };

type SetTodoAction = {
  type: 'currentTodo/SET';
  payload: number;
};

const removeTodo = (): RemoveTodoAction => ({ type: 'currentTodo/REMOVE' });

const setTodo = (todoId: number): SetTodoAction => ({
  type: 'currentTodo/SET',
  payload: todoId,
});

export const actions = { setTodo, removeTodo };

type Action = SetTodoAction | RemoveTodoAction;

const currentTodoReducer = (
  state: number | null = null,
  action: Action,
): number | null => {
  switch (action.type) {
    case 'currentTodo/SET':
      return action.payload;

    case 'currentTodo/REMOVE':
      return null;

    default:
      return state;
  }
};

export default currentTodoReducer;
