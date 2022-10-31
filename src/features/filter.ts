export enum FilterStatus {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
}

type Filter = {
  query: string;
  status: FilterStatus;
};

type AllAction = {
  type: 'ALL',
  payload: string,
};

type ActiveAction = {
  type: 'ACTIVE',
  payload: string,
};

type CompletedAction = {
  type: 'COMPLETED',
  payload: string,
};

type Action = AllAction | ActiveAction | CompletedAction;

const setFilter = (status: string, payload: string): Action => {
  switch (status) {
    case 'ALL':
      return {
        type: 'ALL',
        payload,
      };

    case 'ACTIVE':
      return {
        type: 'ACTIVE',
        payload,
      };

    case 'COMPLETED':
      return {
        type: 'COMPLETED',
        payload,
      };

    default:
      return {
        type: 'ALL',
        payload: '',
      };
  }
};

const setQuery = (payload: string, type: FilterStatus) => {
  return {
    type,
    payload,
  };
};

export const actions = { setQuery, setFilter };

const defaultFilter = {
  query: '',
  status: FilterStatus.ALL,
};

const filterReducer = (filter: Filter = defaultFilter, action: Action) => {
  switch (action.type) {
    case 'ALL':
      return {
        query: action.payload,
        status: FilterStatus.ALL,
      };

    case 'ACTIVE':
      return {
        query: action.payload,
        status: FilterStatus.ACTIVE,
      };

    case 'COMPLETED':
      return {
        query: action.payload,
        status: FilterStatus.COMPLETED,
      };

    default:
      return filter;
  }
};

export default filterReducer;
