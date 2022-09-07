import { Status } from '../types/Status';

type SetFilterQuery = { type: 'filter/query/SET', payload: string };
type SetFilterStatus = { type: 'filter/status/SET', payload: Status };

const setFilterQuerry = (querry: string): SetFilterQuery => ({
  type: 'filter/query/SET',
  payload: querry,
});

const setFilterStatus = (status: Status): SetFilterStatus => ({
  type: 'filter/status/SET',
  payload: status,
});

export const actions = { setFilterQuerry, setFilterStatus };

const initialState: State = {
  query: '',
  status: Status.ALL,
};

type State = {
  query: string,
  status: Status,
};

type Action = SetFilterQuery | SetFilterStatus;

const filterReducer = (
  state: State = initialState,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/query/SET':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/status/SET':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
