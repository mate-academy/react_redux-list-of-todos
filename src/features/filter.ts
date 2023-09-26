type ChangeQueryAction = { type: 'filterTodo/query', payload: string };
type ShowAllTodosAction = { type: 'filterTodo/ALL', payload: string, };
type ShowActiveTodosAction = { type: 'filterTodo/Active', payload: string, };
type ShowCompletedTodosAction = {
  type: 'filterTodo/Completed', payload: string };
type DeleteQueryAction = { type: 'filterTodo/Delete', payload: string };

const changeQuery = (query: string): ChangeQueryAction => (
  { type: 'filterTodo/query', payload: query });

const showAllTodos = (query: string): ShowAllTodosAction => (
  {
    type: 'filterTodo/ALL',
    payload: query,
  });
const showActiveTodos = (query: string): ShowActiveTodosAction => (
  {
    type: 'filterTodo/Active',
    payload: query,
  });

const showCompletedTodos = (query: string): ShowCompletedTodosAction => (
  {
    type: 'filterTodo/Completed',
    payload: query,
  });

const deleteQuery = (status: string): DeleteQueryAction => (
  {
    type: 'filterTodo/Delete',
    payload: status,
  }
);

export const actions = {
  showAllTodos, showActiveTodos, showCompletedTodos, changeQuery, deleteQuery,
};

type Action = ShowAllTodosAction
| ShowActiveTodosAction
| ShowCompletedTodosAction
| ChangeQueryAction
| DeleteQueryAction;

const filterReducer = (
  state = { query: '', status: 'all' }, action: Action,
) => {
  switch (action.type) {
    case 'filterTodo/Completed':
      return {
        query: action.payload,
        status: 'completed',
      };

    case 'filterTodo/Active':
      return {
        query: action.payload,
        status: 'active',
      };

    case 'filterTodo/query':
      return {
        query: action.payload,
        status: state.status,
      };

    case 'filterTodo/ALL':
      return {
        query: action.payload,
        status: 'all',
      };

    case 'filterTodo/Delete':
      return {
        query: '',
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
