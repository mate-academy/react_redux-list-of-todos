import { AnyAction } from 'redux';

const SORT_TYPE = 'SORT_TYPE';

export const setSortType = (sortType: string) => ({ type: SORT_TYPE, sortType });

export const getSortType = (state: RootState) => state.sortType;

export const sortTypeReducer = (state = { sortType: 'id' }, action: AnyAction) => {
  switch (action.type) {
    case SORT_TYPE:
      return { ...state, sortType: action.sortType };

    default:
      return state;
  }
}
