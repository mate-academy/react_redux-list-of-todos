type AddQueryAction = {
  type: 'filters/ADD_QUERY',
  payload: string,
};
type AddStatusAction = {
  type: 'filters/ADD_STATUS',
  payload: string,
};
type Action = AddStatusAction | AddQueryAction;

const addQuery = (query: string): AddQueryAction => ({
  type: 'filters/ADD_QUERY',
  payload: query,
});

const addStatus = (status: string): AddStatusAction => ({
  type: 'filters/ADD_STATUS',
  payload: status,
});

export const actions = { addQuery, addStatus };

const initFilters = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initFilters, action: Action) => {
  switch (action.type) {
    case 'filters/ADD_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filters/ADD_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
