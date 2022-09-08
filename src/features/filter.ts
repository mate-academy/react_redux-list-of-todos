/* eslint-disable @typescript-eslint/naming-convention */
import { Status } from '../types/Status';

interface State {
  query: string;
  status: string;
}

const initialState = {
  query: '',
  status: 'all',
};

type setQueryAction = {
  type: 'filter/set-query';
  payload: string;
};

type setStatusAction = {
  type: 'filter/set-status';
  payload: Status;
};
type Actions = setQueryAction | setStatusAction;

// export const actions = { setQueryAction, setStatusAction };

const filterReducer = (
  state: State = initialState,
  action: Actions,
): State => {
  switch (action.type) {
    case 'filter/set-query':
      return {
        ...state,
        query: action.payload,
      };
    case 'filter/set-status':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
