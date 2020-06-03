import { Action } from 'redux';

const SORT_TYPE = 'SORT_TYPE';

type SortType = Action<typeof SORT_TYPE> & { sortType: string };

export const setSortTypeAction = (sortType: string): SortType => ({ type: SORT_TYPE, sortType });

const sortTypeReducer = (state = '', action: SortType) => {
  switch (action.type) {
    case SORT_TYPE:
      return action.sortType;

    default:
      return state;
  }
};

export default sortTypeReducer;
