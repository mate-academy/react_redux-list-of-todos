type SetQueryAction = { type: 'filterQuery/SET', payload: string };
type SetStatusAction = { type: 'filterStatus/SET', payload: string };

const setQuery = (value: string): SetQueryAction => ({
  type: 'filterQuery/SET',
  payload: value,
});
const setStatus = (value: string): SetStatusAction => ({
  type: 'filterStatus/SET',
  payload: value,
});

type Action = SetQueryAction | SetStatusAction;
export const actions = { setQuery, setStatus };

const filterReducer = (
  state = {
    query: '',
    status: 'all',
  },
  action: Action,
) => {
  switch (action.type) {
    case 'filterQuery/SET':
      return { ...state, query: action.payload };

    case 'filterStatus/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
