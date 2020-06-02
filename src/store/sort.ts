import { AnyAction } from 'redux';

const SORT_BY = 'SORT_BY';
const REVERSE = 'REVERSE';
const SORT_ASK = 'SORT_ASK';

type SortState = {
  field: string;
  order: 'ASK' | 'DESK' ;
};

const initialState: SortState = {
  field: '',
  order: 'ASK',
};

export const setSortField = (value: string) => ({ type: SORT_BY, field: value });
export const setSortOrder = () => ({ type: REVERSE });
export const setSortAsk = () => ({ type: SORT_ASK });

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SORT_BY:
      return {
        ...state,
        field: action.field,
      };
    case REVERSE:
      return {
        ...state,
        order: state.order === 'ASK' ? 'DESK' : 'ASK',
      };
    case SORT_ASK:
      return {
        ...state,
        order: 'ASK',
      };
    default:
      return state;
  }
};

export default reducer;
