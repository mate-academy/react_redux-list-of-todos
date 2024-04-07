type ChangeStatusAction = {
  type: 'filter/CHANGE_STATUS';
  payload: string;
};

const changeStatus = (status: string): ChangeStatusAction => ({
  type: 'filter/CHANGE_STATUS',
  payload: status,
});

type ChangeQueryAction = {
  type: 'filter/CHANGE_QUERY';
  payload: string;
};

const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'filter/CHANGE_QUERY',
  payload: query,
});

export const actions = {
  changeStatus,
  changeQuery,
};

interface State {
  query: string;
  status: string;
}

type Action = ChangeStatusAction | ChangeQueryAction;

const initialState = {
  query: '',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/CHANGE_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/CHANGE_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export const filterActions = { changeStatus, changeQuery };
export default filterReducer;
