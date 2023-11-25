import { Form } from '../types/Form';

type StatusSelectAction = { type: 'features/STATUS'; payload: string };
type InputAction = { type: 'features/QUERY'; payload: string };
type Action = StatusSelectAction | InputAction;

export const actions = {
  statusSelect: (value: string): StatusSelectAction => {
    return { type: 'features/STATUS', payload: value };
  },
  input: (query: string): InputAction => {
    return { type: 'features/QUERY', payload: query };
  },
};

const initialFilter = {
  input: '',
  statusSelect: 'all',
};

const filterReducer = (filter: Form = initialFilter, action: Action) => {
  switch (action.type) {
    case 'features/STATUS':
      return { ...filter, statusSelect: action.payload };

    case 'features/QUERY':
      return { ...filter, input: action.payload };

    default:
      return filter;
  }
};

export default filterReducer;
