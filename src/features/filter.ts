/* eslint-disable */
type SetSearchQuery = { type: 'filter/SET_QUERY'; payload: string };

type ChangeStatus = { type: 'filter/CHANGE_STATUS'; payload: string };

const setSearchQuery = (data: string): SetSearchQuery => ({
  type: 'filter/SET_QUERY',
  payload: data,
});

const changeFilterStatus = (data: string): ChangeStatus => ({
  type: 'filter/CHANGE_STATUS',
  payload: data,
});

type Action = SetSearchQuery | ChangeStatus;

export const actions = {
  /* put action creators here */
  setSearchQuery,
  changeFilterStatus,
};

type State = {
  query: string,
  status: string,
};

const defaultFilter = {
  query: '',
  status: 'all',
}

const filterReducer = (state: State = defaultFilter, action: Action): State => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/CHANGE_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }

};

export default filterReducer;
