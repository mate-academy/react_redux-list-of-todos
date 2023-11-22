type SetQueryAction = { type: 'filterQuery/SET', payload: string };

const setQuery = (value: string): SetQueryAction => ({
  type: 'filterQuery/SET',
  payload: value,
});

type SetStatusAction = { type: 'filterStatus/SET', payload: string };

const setStatus = (value: string): SetStatusAction => ({
  type: 'filterStatus/SET',
  payload: value,
});

type Action = SetQueryAction | SetStatusAction;

export const actions = { setQuery, setStatus };

const initFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initFilter, action: Action) => {
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
