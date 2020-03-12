import { AnyAction } from 'redux';
import { type } from '../actions';

const queryState: QuerySort = {
  query: 'id',
};

export const queryReducer = (state = queryState, action: AnyAction): QuerySort => {
  switch (action.type) {
    case type.SET_QUERY_SORT:
      return {
        query: action.query,
      };
    default:
      return state;
  }
};
