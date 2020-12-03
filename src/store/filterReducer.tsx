import { AnyAction } from 'redux';

const SORT_TODOS = 'SORT_TODOS';

export const setSort = (sort: string) => ({ type: SORT_TODOS, sort});

const reducer = (sort = '', action: AnyAction) => {
  switch (action.type) {
    case SORT_TODOS:
      return action.sort;

    default:
      return sort;
  }
};

export default reducer;
