type AddQueryAction = {
  type: 'todos/ADD_QUERY';
  payload: string;
};

type AddStatusAction = {
  type: 'todos/ADD_STATUS';
  payload: string;
};

type Action = AddQueryAction | AddStatusAction;

const addQuery = (query: string):AddQueryAction => ({
  type: 'todos/ADD_QUERY',
  payload: query,
});

const addStatus = (status: string): AddStatusAction => ({
  type: 'todos/ADD_STATUS',
  payload: status,
});

const initialFilter = {
  query: '',
  status: 'all',
};

export const actions = { addQuery, addStatus };

const filterReducer = (state = initialFilter, action: Action) => {
  switch (action.type) {
    case 'todos/ADD_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'todos/ADD_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
