/* eslint-disable max-len */
type SetQuery = { type: 'setQuery', payload: string };
type SetStatus = { type: 'setStatus', payload: string };

type Action = SetQuery | SetStatus;

export const actions = {
  setQuery: (query: string): SetQuery => ({ type: 'setQuery', payload: query }),
  setStatus: (status: string): SetStatus => ({ type: 'setStatus', payload: status }),

};

const filterReducer = (state = {
  query: '',
  status: 'all',
}, action: Action) => {
  switch (action.type) {
    case 'setQuery': return {
      ...state,
      query: action.payload,
    };

    case 'setStatus': return {
      ...state,
      status: action.payload,
    };

    default: return state;
  }
};

export default filterReducer;
