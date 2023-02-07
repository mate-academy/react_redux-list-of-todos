import { Status } from '../types/Status';

type SetQuaryAction = { type: 'filter/SET_QUARY', payload: string };
type SetStatusAction = { type: 'filter/SET_STATUS', payload: Status };

type Action = SetQuaryAction | SetStatusAction;

const setStatus = (status: Status): SetStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQuary = (quary: string): SetQuaryAction => ({
  type: 'filter/SET_QUARY',
  payload: quary,
});

type Filter = {
  status: Status;
  quary: string;
};

const initialValue: Filter = { status: 'all', quary: '' };

const filterReducer = (filter: Filter = initialValue, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUARY':
      return { ...filter, quary: action.payload };

    case 'filter/SET_STATUS':
      return { ...filter, status: action.payload };

    default:
      return filter;
  }
};

export const actions = { setStatus, setQuary };
export default filterReducer;
