import { Status } from '../types/Status';
import { State } from '../types/State';
import { FilterType } from '../types/FilterType';

type ChangeQueryAction = {
  type: 'query/CHANGE',
  payload: string,
};

const changeQuery = (query: string): ChangeQueryAction => ({
  type: 'query/CHANGE',
  payload: query,
});

type ChangeStatusAction = {
  type: 'status/CHANGE',
  payload: Status,
};

const changeStatus = (status: Status): ChangeStatusAction => ({
  type: 'status/CHANGE',
  payload: status,
});

export const actions = { changeQuery, changeStatus };

type Action = ChangeQueryAction | ChangeStatusAction;

const initialState: State = {
  query: '',
  status: FilterType.All,
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'query/CHANGE':
      return { ...state, query: action.payload };

    case 'status/CHANGE':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
