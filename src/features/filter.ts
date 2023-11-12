import { SortType } from '../types/SortType';

type SetFilterAction = {
  type: 'filterAction/SET',
  payload: {
    query: string,
    status: SortType,
  },
};

type RemoveFilterAction = {
  type: 'filterAction/REMOVE',
  payload: {
    status: SortType,
  },
};

const setFilter = (
  query: string,
  status: SortType,
): SetFilterAction => ({
  type: 'filterAction/SET',
  payload: {
    query,
    status,
  },
});

const removeFilter = (status: SortType): RemoveFilterAction => ({
  type: 'filterAction/REMOVE',
  payload: {
    status,
  },
});

export const actions = { setFilter, removeFilter };

type State = { query: string, status: SortType };
type Action = SetFilterAction | RemoveFilterAction;

export const filterReducer = (
  state: State = { query: '', status: SortType.ALL },
  action: Action,
) => {
  switch (action.type) {
    case 'filterAction/SET': {
      return {
        query: action.payload.query,
        status: action.payload.status,
      };
    }

    case 'filterAction/REMOVE': {
      return {
        query: '',
        status: action.payload.status,
      };
    }

    default: {
      return state;
    }
  }
};
