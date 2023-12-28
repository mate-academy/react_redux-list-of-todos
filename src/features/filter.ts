type FilterTodosAction = { type: 'filter/FILTER', payload: string };
const filterTodo = (value: string): FilterTodosAction => ({
  type: 'filter/FILTER', payload: value,
});

type SelectTodosAction = { type: 'select/SELECT', payload: string };
const selectTodo = (value: string): SelectTodosAction => ({
  type: 'select/SELECT', payload: value,
});

type RemoveQueryAction = { type: 'select/REMOVE' };
const removeQuery = (): RemoveQueryAction => ({ type: 'select/REMOVE' });

type Action = FilterTodosAction | SelectTodosAction | RemoveQueryAction;

export const actions = { filterTodo, selectTodo, removeQuery };

type InitialStateType = { query: string, status: string };
const initialState: InitialStateType = { query: '', status: 'all' };

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/FILTER':
      return {
        ...state,
        query: action.payload,
      };

    case 'select/SELECT':
      return {
        ...state,
        status: action.payload,
      };

    case 'select/REMOVE':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }
};

export default filterReducer;
