export type StatusTypes = 'all' | 'active' | 'completed';

type Filter = {
  query: string,
  status: StatusTypes;
};

type SetQueryType = {
  type: 'query/SET',
  payload: string,
};

type SetStatusType = {
  type: 'status/SET',
  payload: StatusTypes,
};

type Action = SetQueryType | SetStatusType;

const setQuery = (value: string): SetQueryType => (
  { type: 'query/SET', payload: value }
);

const setStatus = (status: StatusTypes): SetStatusType => (
  { type: 'status/SET', payload: status }
);

const initialValue: Filter = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: Filter = initialValue,
  action: Action,
): Filter => {
  switch (action.type) {
    case 'query/SET':
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export const actions = { setQuery, setStatus };

export default filterReducer;
