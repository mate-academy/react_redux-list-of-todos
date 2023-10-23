import { SortType } from '../types/SortType';

type ChangeStatusActionType = {
  type: 'filter/CHANGE_STATUS',
  payload: SortType,
};

type ChangeQueryActionType = {
  type: 'filter/CHANGE_QUERY',
  payload: string,
};

type Action = ChangeQueryActionType | ChangeStatusActionType;
type State = {
  query: string,
  status: SortType,
};

const changeStatusAction = (status: SortType): ChangeStatusActionType => ({
  type: 'filter/CHANGE_STATUS',
  payload: status,
});

const changeQueryAction = (query: string): ChangeQueryActionType => ({
  type: 'filter/CHANGE_QUERY',
  payload: query,
});

export const actions = {
  changeQueryAction,
  changeStatusAction,
};

const filterReducer = (
  state: State = { query: '', status: SortType.ALL },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/CHANGE_QUERY':
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
