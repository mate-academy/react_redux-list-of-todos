import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/set';
  payload: Todo[];
};

const set = (data: Todo[]): SetTodos => ({
  type: 'todos/set',
  payload: data,
});

type FilterTodos = {
  type: 'todos/filter';
  payload: {
    data: Todo[],
    query: string,
    status: string,
  }
};

const getFiltered = (
  data: Todo[],
  query: string,
  status: string,
): FilterTodos => ({
  type: 'todos/filter',
  payload: { data, query, status },
});

type Action = SetTodos | FilterTodos;

export const actions = {
  set,
  getFiltered,
};

function findTodos(todos: Todo[], prompt: string) {
  const searchBy = prompt.trim().toLowerCase();

  if (searchBy) {
    return todos.filter((todo) => todo.title.toLowerCase().includes(searchBy));
  }

  return todos;
}

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/set':
      return action.payload;

    case 'todos/filter': {
      const { data, query, status } = action.payload;

      let filteredData = [...data];

      switch (status) {
        case 'active':
          filteredData = filteredData.filter(
            todo => !todo.completed,
          );
          break;

        case 'completed':
          filteredData = filteredData.filter(
            todo => todo.completed,
          );
          break;

        default:
          break;
      }

      return findTodos(filteredData, query);
    }

    default:
      return state;
  }
};

export default todosReducer;
