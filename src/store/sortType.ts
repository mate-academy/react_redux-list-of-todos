import { AnyAction } from 'redux';

const SORT_TYPE = 'SORT_TYPE';

export const setSortType = (sortType: string) => ({ type: SORT_TYPE, sortType });

const sortTypeReducer = (state = 'id', action: AnyAction) => {
  switch (action.type) {
    case SORT_TYPE:
      return action.sortType;

    default:
      return state;
  }
}

export default sortTypeReducer;
