type AddQueryAction = {
  type: 'filter/ADD_QUERY';
  payload: string;
};

type AddStatusAction = {
  type: 'filter/ADD_STATUS';
  payload: string;
};

type Action = AddQueryAction | AddStatusAction;

const addQuery = (query: string): AddQueryAction => ({
  type: 'filter/ADD_QUERY',
  payload: query,
});

const addStatus = (status: string): AddStatusAction => ({
  type: 'filter/ADD_STATUS',
  payload: status,
});

export const actions = { addQuery, addStatus };

const initialFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialFilter, action: Action) => {
  switch (action.type) {
    case 'filter/ADD_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/ADD_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
