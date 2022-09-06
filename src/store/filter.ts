type RootState = {
  query: string,
  status: string,
};

type SetStatus = {
  type: 'filter/SetStatus',
  payload: {
    status: string,
  }
};

type SetQuery = {
  type: 'filter/SetQuery',
  payload: {
    query: string
  }
};

type Action = SetStatus | SetQuery;

export const filterActions = {
  SetStatus: (status: string) => ({
    type: 'filter/SetStatus',
    payload: {
      status,
    },
  }),
  SetQuery: (query: string) => (
    {
      type: 'filter/SetQuery',
      payload: {
        query,
      },
    }
  ),
};

const initialState: RootState = {
  query: '',
  status: 'all',
};

const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SetStatus':
      return {
        ...state,
        ...action.payload,
      };

    case 'filter/SetQuery':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
