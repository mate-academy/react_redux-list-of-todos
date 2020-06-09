import { Action } from 'redux';
import { SET_PAGE, SET_PER_PAGE } from '../constants/actionTypes';

type SetPageAction = Action<typeof SET_PAGE> & {
  page: number;
};
type SetPerPageAction = Action<typeof SET_PER_PAGE> & {
  perPage: number;
};

export const setPage = (page: number): SetPageAction => ({
  type: SET_PAGE,
  page,
});
export const setPerPage = (perPage: number): SetPerPageAction => ({
  type: SET_PER_PAGE,
  perPage,
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
        page: action.page,
      };

    case SET_PER_PAGE:
      return {
        ...paginationState,
        perPage: action.perPage,
        page: 1,
      };

    default:
      return paginationState;
  }
};

export default reduce;
