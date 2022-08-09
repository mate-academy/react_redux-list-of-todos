import { Dispatch } from 'redux';
import { getUser } from '../../api';
import { UserAction, UserActionTypes } from '../../types/User';

export function fetchUser(id: number) {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USER });

      const response = await getUser(id);

      dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS,
        payload: response,
      });
    } catch {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'Something happen on the Server',
      });
    }
  };
}
