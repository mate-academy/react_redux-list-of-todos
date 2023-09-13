type SetStatus = {
  type: 'status/SET';
  payload: string;
};

type SetQuery = {
  type: 'query/SET';
  payload: string;
};

type RemoveQuery = {
  type: 'query/REMOVE';
};

const setStatus = (value: string): SetStatus => ({
  type: 'status/SET',
  payload: value,
});

const setQuery = (value: string): SetQuery => ({
  type: 'query/SET',
  payload: value,
});

const removeQuery = (): RemoveQuery => ({
  type: 'query/REMOVE',
});

export const actions = { setStatus, setQuery, removeQuery };

const initialValue = {
  query: '',
  status: 'all',
};

type Initial = {
  query: string,
  status: string,
};

type Action = SetStatus | SetQuery | RemoveQuery;

const filterReducer = (values: Initial = initialValue, action: Action) => {
  switch (action.type) {
    case 'status/SET':
      return { ...values, status: action.payload };
    case 'query/SET':
      return { ...values, query: action.payload };
    case 'query/REMOVE':
      return { ...values, query: '' };
    default:
      return values;
  }
};

export default filterReducer;
