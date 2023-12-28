/* eslint-disable max-len */
// type SetQuery = { type: 'setQuery', payload: string };
// type SetStatus = { type: 'setStatus', payload: string };

type SetQuery = { type: 'filter/QUERY', payload: string };
type SetStatus = { type: 'filter/STATUS', payload: string };

type Action = SetQuery | SetStatus;

const setQuery = (query: string): SetQuery => ({ type: 'filter/QUERY', payload: query });
const setStatus = (status: string): SetStatus => ({ type: 'filter/STATUS', payload: status });

export const actions = { setQuery, setStatus };

const filterReducer = (state = {
  query: '',
  status: 'all',
}, action: Action) => {
  switch (action.type) {
    case 'filter/QUERY': return {
      ...state,
      query: action.payload,
    };

    case 'filter/STATUS': return {
      ...state,
      status: action.payload,
    };

    default: return state;
  }
};

export default filterReducer;
