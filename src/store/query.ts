import { Action } from 'redux';
import { SET_QUERY } from '../constants/actionTypes';

type setQueryAction = Action<typeof SET_QUERY> & {
  query: string;
};

export const setQuery = (query: string): setQueryAction => ({
  type: SET_QUERY,
  query,
});

type LoadingAction = setQueryAction;

const reduce = (query = '', action: LoadingAction): string => {
  switch (action.type) {
    case SET_QUERY:
      return action.query;
    default:
      return query;
  }
};

export default reduce;
