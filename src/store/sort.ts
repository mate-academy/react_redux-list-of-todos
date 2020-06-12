import { Action } from 'redux';

const SORT_BY = 'SORT_BY';


type SortByAction = Action<typeof SORT_BY> & {
  field: string;
};

export const sortBy = (field: string): SortByAction => ({ type: SORT_BY, field });

type AlowwedActions = SortByAction;


type SortState = {
  field: string;
  order: string;
  completed: boolean;
};

const defaultsortState = {
  field: 'id',
  order: 'ASC',
  completed: true || false,
};

const sortReducer = (
  sortState: SortState = defaultsortState,
  action: AlowwedActions,
): SortState => {
  switch (action.type) {
    case SORT_BY:
      if (action.field === sortState.field) {
        return {
          ...sortState,
          order: sortState.order === 'ASC' ? 'DESC' : 'ASC',
        };
      }

      return {
        ...sortState,
        field: action.field,
        order: 'ASC',
      };
    default:
      return sortState;
  }
};

export default sortReducer;
