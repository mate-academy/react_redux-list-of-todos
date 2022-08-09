import { AnyAction } from 'redux';

export enum PaginationActionTypes {
  CHANGE_PAGE_NEXT = 'CHANGE_PAGE_NEXT',
  CHANGE_PAGE_PREV = 'CHANGE_PAGE_PREV',
  UPDATE_TOTAL_AMOUNT = 'UPDATE_TOTAL_AMOUNT',
  UPDATE_AMOUNT_ITEMS = 'UPDATE_AMOUNT_ITEMS',
  CHANGE_PAGE = 'CHANGE_PAGE',
}

const initialState = {
  total: 0,
  page: 1,
  amountItemsPerPage: 20,
};

export const paginationReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PaginationActionTypes.CHANGE_PAGE_NEXT:
      return {
        ...state,
        page: state.page + 1,
      };
    case PaginationActionTypes.CHANGE_PAGE_PREV:
      return {
        ...state,
        page: state.page - 1,
      };
    case PaginationActionTypes.UPDATE_TOTAL_AMOUNT:
      return {
        ...state,
        total: action.payload,
      };
    case PaginationActionTypes.UPDATE_AMOUNT_ITEMS:
      return {
        ...state,
        amountItemsPerPage: action.payload,
      };
    case PaginationActionTypes.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};
