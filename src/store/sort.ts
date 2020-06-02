import { AnyAction } from 'redux';

const SORT_BY = 'SORT_BY';
const REVERSE = 'REVERSE';
const SORT_ASC = 'SORT_ASC';

type SortState = {
  field: string;
  order: 'ASC' | 'DESC' ;
};

const initialState: SortState = {
  field: '',
  order: 'ASC',
};

export const setSortField = (value: string) => ({ type: SORT_BY, field: value });
export const setSortOrder = () => ({ type: REVERSE });
export const setSortAsc = () => ({ type: SORT_ASC });

const reducer = (state: SortState = initialState, action: AnyAction) => {
  switch (action.type) {
    case SORT_BY:
      return {
        ...state,
        field: action.field,
      };
    case REVERSE:
      return {
        ...state,
        order: state.order === 'ASC' ? 'DESC' : 'ASC',
      };
    case SORT_ASC:
      return {
        ...state,
        order: 'ASC',
      };
    default:
      return state;
  }
};

export default reducer;
