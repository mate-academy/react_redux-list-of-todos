import { AnyAction } from 'redux';
import { HANDLE_SORT } from './actionTypes';

type SortState = {
  sortType: string;
};

const initialState: SortState = {
  sortType: '',
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HANDLE_SORT:
      return {
        ...state,
        sortType: action.sortType,
      };
    default:
      return state;
  }
};

export default reducer;
