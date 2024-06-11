/* eslint-disable @typescript-eslint/default-param-last */

type SetQueryAction = {
  type: 'filter/SET';
  payload: {
    status: string;
    query: string;
  };
};

type RemoveQueryAction = {
  type: 'filter/REMOVE';
  payload: {
    status: string;
    query: string;
  };
};

const setFilter = (status: string, query: string): SetQueryAction => ({
  type: 'filter/SET',
  payload: {
    status,
    query,
  },
});

const removeFilter = (status: string, query: string): RemoveQueryAction => ({
  type: 'filter/REMOVE',
  payload: {
    status,
    query,
  },
});

type Actions = RemoveQueryAction | SetQueryAction;

const filterReducer = (
  state = { status: 'All', query: '' },
  actions: Actions,
) => {
  switch (actions.type) {
    case 'filter/SET':
      return {
        status: actions.payload.status,
        query: actions.payload.query,
      };

    case 'filter/REMOVE':
      return {
        status: actions.payload.status,
        query: '',
      };

    default:
      return state;
  }
};

export const actions = {
  setFilter,
  removeFilter,
};

export default filterReducer;
