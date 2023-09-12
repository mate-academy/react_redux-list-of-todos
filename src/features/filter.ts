type ChangeStatus = { type: 'filter/STATUS', payload: string };
type ChangeByQuery = { type: 'filter/QUERY', payload: string };

type Action = ChangeStatus | ChangeByQuery;

const changeStatus = (status: string): ChangeStatus => ({
  type: 'filter/STATUS', payload: status,
});
const changeByQuery = (query: string): ChangeByQuery => ({
  type: 'filter/QUERY', payload: query,
});

export const actions = { changeStatus, changeByQuery };

type ParamsFilter = {
  query: string,
  status: string,
};

const initialParams: ParamsFilter = {
  query: '',
  status: 'all',
};

const filterReducer = (params = initialParams, action: Action) => {
  switch (action.type) {
    case 'filter/STATUS': {
      return {
        ...params,
        status: action.payload,
      };
    }

    case 'filter/QUERY': {
      return {
        ...params,
        query: action.payload,
      };
    }

    default:
      return params;
  }
};

export default filterReducer;
