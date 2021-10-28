const initialState = {
  todos: [],
  todosToRender: [],
  input: '',
  select: 'all',
  user: null,
  userId: 0,
};

function filter(state: Todo[], input: string, select: string) {
  let obl = [...state];

  if (select === 'active') {
    obl = obl.filter((todo: Todo) => todo.completed === false);
  }

  if (select === 'completed') {
    obl = obl.filter((todo: Todo) => todo.completed === true);
  }

  if (input) {
    obl = obl.filter((todo: Todo) => {
      return (todo.title).toLowerCase().includes(input.toLowerCase());
    });
  }

  return obl;
}

export function reducerTodos(state = initialState, action: any) {
  switch (action.type) {
    case 'todosFetchDataSuccess':
      return {
        ...state,
        todos: action.todos,
        todosToRender: filter(state.todos, state.input, state.select),
      };
    case 'userFetchDataSuccess':
      return {
        ...state,
        user: action.user,
      };
    case 'ADD_Input':
      return {
        ...state,
        input: `${action.input}`,
      };
    case 'ADD_Select':
      return {
        ...state,
        select: `${action.select}`,
      };
    case 'chooseUserId':
      return {
        ...state,
        userId: action.userId,
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.userId),
        todosToRender: state.todos.filter((todo: Todo) => todo.id !== action.userId),
      };
    default:
      return state;
  }
}
