import { Status } from '../types/Status';

type SetFilterSelect = {
  type: 'todos/FILTER_SELECT';
  payload: Status;
};
type SetFilterText = {
  type: 'todos/FILTER_TEXT';
  payload: string;
};
type Action = SetFilterSelect | SetFilterText;
type State = {
  status: Status;
  text: string;
};

export const filterSelect = (select: Status) => ({
  type: 'todos/FILTER_SELECT',
  payload: select,
});

export const filterText = (text: string) => ({
  type: 'todos/FILTER_TEXT',
  payload: text,
});

const initialState: {
  status: Status;
  text: string;
} = {
  status: 'all',
  text: '',
};

const filterReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'todos/FILTER_SELECT':
      return { ...state, status: action.payload };
    case 'todos/FILTER_TEXT':
      return { ...state, text: action.payload };
    default:
      return state;
  }
};

export const actions = {
  filterSelect,
  filterText,
};
export default filterReducer;
