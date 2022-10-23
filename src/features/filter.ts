// import { Status } from '../types/Status';
// import { Todo } from '../types/Todo';

type setStatusAction = {
  type: 'filter/SET_STATUS',
  payload: string,
};

type setQweryAction = {
  type: 'filter/SET_QWERY',
  payload: string,
};

type deleteQweryAction = {
  type: 'filter/DELETE_QWERY',
};

const setStatus = (status: string): setStatusAction => ({
  type: 'filter/SET_STATUS',
  payload: status,
});

const setQwery = (qwery: string): setQweryAction => ({
  type: 'filter/SET_QWERY',
  payload: qwery,
});

const deleteQwery = (): deleteQweryAction => ({
  type: 'filter/DELETE_QWERY',
});

export const actions = {
  setStatus,
  setQwery,
  deleteQwery,
};

type State = {
  status: string | null,
  query: string | null,
} | null;

type Action = setStatusAction | setQweryAction | deleteQweryAction;

const filterReducer = (
  state: State = null,
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };

    case 'filter/SET_QWERY':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/DELETE_QWERY':
      return {
        ...state,
        query: '',
      };

    default:
      return state;
  }

  // return {
  //   query: '',
  //   status: 'all',
  // };
};

export default filterReducer;
