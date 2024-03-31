export const ActiveTodos = 'active';
export const CompletedTodos = 'completed';
export const AllTodos = 'all';
export const changeQuery = 'changeQuery';

export const Filter = (type: string, payload: string) => ({ type, payload });
export const Query = (payload: string) => ({ type: changeQuery, payload });

interface Action {
  type: string;
  payload: string;
}

type DefaultValue = {
  status: string;
  query: string;
};

const defaultValue: DefaultValue = {
  status: AllTodos,
  query: '',
};
// eslint-disable-next-line
const filterReducer = (state = defaultValue, action: Action): DefaultValue => {
  switch (action.type) {
    case ActiveTodos:
      return { ...state, status: action.payload };
    case CompletedTodos:
      return { ...state, status: action.payload };
    case AllTodos:
      return { ...state, status: action.payload };
    case changeQuery:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
