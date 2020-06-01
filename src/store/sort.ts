import { AnyAction } from 'redux';

const SORT_BY = 'SORT_BY';

export const sortBy = (field: string) => ({ type: SORT_BY, field });

type State = {
  field: string;
  order: 'ASC' | 'DESC';
};

const initState: State = {
  field: '',
  order: 'ASC',
};

export const getSortField = (sort: State) => sort.field;
export const isSortedAsc = (sort: State) => sort.order === 'ASC';

export const reducer = (sort = initState, action: AnyAction) => {
  switch (action.type) {
    case SORT_BY:
      if (sort.field === action.field) {
        return {
          ...sort,
          order: sort.order === 'ASC' ? 'DESC' : 'ASC',
        };
      }

      return {
        ...sort,
        field: action.field,
        order: 'ASC',
      };

    default:
      return sort;
  }
};

export default reducer;
