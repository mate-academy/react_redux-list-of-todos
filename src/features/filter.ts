type Payload = { query: string, status: string };
type ActiveTodosAction = { type: 'filterTodo/ACTIVE', payload: Payload };
type CompletedTodosAction = { type: 'filterTodo/COMPLETED', payload: Payload };
type AllTodosAction = { type: 'filterTodo/ALL', payload: Payload };
type QueryTodosAction = { type: 'filterTodo/QUERY', payload: Payload };

type Action = ActiveTodosAction
| CompletedTodosAction
| AllTodosAction
| QueryTodosAction;

let currentPayload: Payload = {
  query: '',
  status: 'all',
};

const filterQueryTodos = (query: string): QueryTodosAction => ({
  type: 'filterTodo/QUERY',
  payload: { ...currentPayload, query },
});

const filterAllTodos = (status: string): AllTodosAction => ({
  type: 'filterTodo/ALL',
  payload: { ...currentPayload, status },
});

const filterActiveTodos = (status: string): ActiveTodosAction => ({
  type: 'filterTodo/ACTIVE',
  payload: { ...currentPayload, status },
});

const filterCompletedTodos = (status: string): CompletedTodosAction => ({
  type: 'filterTodo/COMPLETED',
  payload: { ...currentPayload, status },
});

export const actions = {
  filterAllTodos,
  filterActiveTodos,
  filterCompletedTodos,
  filterQueryTodos,
};

const filterReducer = (
  state: Payload = { query: '', status: 'all' }, action: Action,
) => {
  switch (action.type) {
    case 'filterTodo/ACTIVE':
    case 'filterTodo/COMPLETED':
    case 'filterTodo/ALL':
    case 'filterTodo/QUERY':
      currentPayload = { ...action.payload };

      return action.payload;

      // case 'filterTodo/COMPLETED':
      //   currentPayload = { ...action.payload };

      //   return action.payload;

      // case 'filterTodo/ALL':
      //   currentPayload = { ...action.payload };

      //   return action.payload;

      // case 'filterTodo/QUERY':
      //   currentPayload = { ...action.payload };

      //   return action.payload;

    default:
      return state;
  }
};

export default filterReducer;
