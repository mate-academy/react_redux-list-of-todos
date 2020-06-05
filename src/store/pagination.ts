import { Action } from 'redux';
import { SET_PAGE, SET_PER_PAGE } from '../constants/actionTypes';

type SetPageAction = Action<typeof SET_PAGE>;
type SetPerPageAction = Action<typeof SET_PER_PAGE>;

export const setPage = (): SetPageAction => ({
  type: SET_PAGE,
});

type PaginationState = {
  page: number;
  perPage: number;
};

const initialState: PaginationState = {
  page: 1,
  perPage: 10,
};

type PaginationAction = SetPageAction | SetPerPageAction;

const reduce = (paginationState = initialState, action: PaginationAction): PaginationState => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...paginationState,
      };
    case SET_PER_PAGE:
      return {
        ...paginationState,
      };
    default:
      return paginationState;
  }
};

export default reduce;
