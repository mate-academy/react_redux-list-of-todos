import { Status } from '../types/Status';

interface State {
  query: string;
  status: string;
}

const initialState: State = {
  query: '',
  status: Status.All,
};

type ChangeQueryAction = {
  type: 'tilter/SET_QUERY';
  payload: string;
};

type ChangeFilterStatus = {
  type: 'filter/SET_STATUS';
  payload: string;
};

const onQueryChange = (value: string): ChangeQueryAction => ({
  type: 'tilter/SET_QUERY',
  payload: value,
});

const onFilterStatusChange = (value: string): ChangeFilterStatus => ({
  type: 'filter/SET_STATUS',
  payload: value,
});

type Action = ChangeQueryAction | ChangeFilterStatus;
// eslint-disable-next-line @typescript-eslint/default-param-last
const filterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'tilter/SET_QUERY':
      return { ...state, query: action.payload };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export const filterActions = { onQueryChange, onFilterStatusChange };
export default filterReducer;
