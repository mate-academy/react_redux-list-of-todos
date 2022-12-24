// export type Status = 'all' | 'active' | 'completed';
type Filters = {
  query: string,
  status: string,
};

type StatusAction = {
  type: 'filters/Status'
  query: string,
  status: string
};

type QueryAction = {
  type: 'filters/Query'
  query: string,
  status: string
};

const editQuery = (filters: Filters, value: string): QueryAction => ({
  ...filters,
  type: 'filters/Query',
  query: value,
});

const editStatus = (filters: Filters, value: string): StatusAction => ({
  ...filters,
  type: 'filters/Status',
  status: value,
});

type Actions = StatusAction | QueryAction;

const startSilters: Filters = {
  query: '',
  status: 'all',
};

const filterReducer = (filters: Filters = startSilters, actions: Actions) => {
  switch (actions.type) {
    case 'filters/Query':
      return {
        ...filters,
        query: actions.query,
      };

    case 'filters/Status':
      return {
        ...filters,
        status: actions.status,
      };

    default:
      return filters;
  }
};

export const actions = { editQuery, editStatus };

export default filterReducer;
