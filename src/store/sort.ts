import { Action } from 'redux';
import { ASC, DESC } from '../constants/sortOrders';
import { SORT_BY } from '../constants/actionTypes';

type SortByAction = Action<typeof SORT_BY> & {
  field: keyof HeadersConfig;
};

export const setSortBy = (field: keyof HeadersConfig): SortByAction => ({
  type: SORT_BY,
  field,
});

type SortState = {
  field: keyof HeadersConfig;
  order: typeof ASC | typeof DESC;
};

const initialState: SortState = {
  field: 'id',
  order: ASC,
};

const reduce = (sortState = initialState, action: SortByAction): SortState => {
  switch (action.type) {
    case SORT_BY:
      if (action.field === sortState.field) {
        return {
          ...sortState,
          order: sortState.order === ASC ? DESC : ASC,
        };
      }

      return {
        ...sortState,
        field: action.field,
        order: ASC,
      };
    default:
      return sortState;
  }
};

export default reduce;
