import { Status } from '../types/Status';

type QuaryAction = {
  type: 'filter/SET_QUARY';
  payload: string;
};

type ClearQuaryAction = {
  type: 'filter/CLEAR_QUARY';
};

type StatusAction = {
  type: 'filter/SET_STATUS';
  payload: Status;
};

const query = (quary: string): QuaryAction => ({
  type: 'filter/SET_QUARY',
  payload: quary,
});

const clearQuary = (): ClearQuaryAction => ({
  type: 'filter/CLEAR_QUARY',
});

const status = (todoStatus: Status): StatusAction => ({
  type: 'filter/SET_STATUS',
  payload: todoStatus,
});

type State = {
  query: string, status: Status
};

const initialState: State = { query: '', status: 'all' };

type Action = QuaryAction | StatusAction | ClearQuaryAction;

export const actions = { query, clearQuary, status };

const filterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'filter/SET_QUARY':
      return { ...state, query: action.payload };

    case 'filter/CLEAR_QUARY':
      return { ...state, query: '' };

    case 'filter/SET_STATUS':
      return { ...state, status: action.payload };

    default:
      return state;
  }
};

export default filterReducer;
