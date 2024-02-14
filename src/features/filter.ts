import { Filter } from '../types/Filter';

type SetFilterAction = { type: 'filter/SET', payload: Filter };

const setFilter = (filter: Filter): SetFilterAction => ({
  type: 'filter/SET',
  payload: filter,
});

export const actions = { setFilter };

type State = Filter;
type Action = SetFilterAction;

const initialState = {
  title: '',
  status: 'all',
};

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
