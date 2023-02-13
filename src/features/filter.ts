import { Status } from '../types/Status';

export type FilterOption = {
  query: string,
  status: Status | string,
};

type SelectAction = {
  type: 'Action / select',
  payLoad: Status | string,
};

type QueryAction = {
  type: 'Action / query',
  payLoad: string,
};

const initFilterOption: FilterOption = { query: '', status: Status.All };

const filterBySelect = (status: Status | string): SelectAction => ({
  type: 'Action / select',
  payLoad: status,
});
const filterByQuery = (currentQuery: string): QueryAction => ({
  type: 'Action / query',
  payLoad: currentQuery,
});

export const filterActions = {
  filterByQuery,
  filterBySelect,
};

const filterReducer = (
  filter = initFilterOption,
  action: SelectAction | QueryAction,
): FilterOption => {
  switch (action.type) {
    case 'Action / query':
      return {
        ...filter,
        query: action.payLoad,
      };

    case 'Action / select': {
      return {
        ...filter,
        status: action.payLoad,
      };
    }

    default:
      return filter;
  }
};

export default filterReducer;
