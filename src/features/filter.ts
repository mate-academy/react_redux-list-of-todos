import { FilterType } from '../types/FilterType';
import { Status } from '../types/Status';

type SetAction = { type: 'filter/set', payload: FilterType };
type ClearAction = { type: 'filter/clear' };

type Action = SetAction | ClearAction;

const set = (filter : FilterType): SetAction => ({
  type: 'filter/set',
  payload: filter,
});

const clear = (): ClearAction => ({ type: 'filter/clear' });

export const actions = { set, clear };

const defaultFilter: FilterType = {
  query: '',
  status: Status.All,
};

const filterReducer = (
  filter = defaultFilter,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/set':
    { const { query, status } = action.payload;

      return {
        query,
        status,
      };
    }

    case 'filter/clear':
      return defaultFilter;

    default:
      return filter;
  }
};

export default filterReducer;
