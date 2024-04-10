import { SelectedOptions } from '../types/SelectedOptions';

type SetQueryAction = {
  type: 'filter/SET_QUERY';
  payload: string;
};

type SetOptionAction = {
  type: 'filter/SET_OPTION';
  payload: SelectedOptions;
};

const setQuery = (query: string): SetQueryAction => ({
  type: 'filter/SET_QUERY',
  payload: query,
});

const setOption = (option: SelectedOptions): SetOptionAction => ({
  type: 'filter/SET_OPTION',
  payload: option,
});

export const actions = { setQuery, setOption };

export type FilterState = {
  query: string;
  status: SelectedOptions;
};

type Action = SetQueryAction | SetOptionAction;

const initialFilterState: FilterState = {
  query: '',
  status: SelectedOptions.all,
};

const filterReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: FilterState = initialFilterState,
  action: Action,
): FilterState => {
  switch (action.type) {
    case 'filter/SET_QUERY':
      return {
        ...state,
        query: action.payload,
      };

    case 'filter/SET_OPTION':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
