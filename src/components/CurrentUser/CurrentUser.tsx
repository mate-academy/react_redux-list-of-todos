import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/users';
import { loadUserAction, setErrorAction, setUserAction } from '../../store/actions';
import { getErrorSelector, getUserSelector } from '../../store/selectors';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { userId } = props;
  const user = useSelector(getUserSelector);
  const isError = useSelector(getErrorSelector);

  useEffect(() => {
    const loadUserFromServer = async () => {
      try {
        const userFromServer = await getUser(userId);

        dispatch(loadUserAction(userFromServer));
        dispatch(setErrorAction(false));
      } catch {
        dispatch(setErrorAction(true));
      }
    };

    loadUserFromServer();
  }, [userId]);

  const handleClearUser = useCallback(() => {
    dispatch(setUserAction(0));
  }, [userId]);

  return (
    <>
      {!isError
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
            <button
              type="button"
              className="button"
              onClick={handleClearUser}
            >
              Clear User
            </button>
          </div>
        )
        : <p>User Not Found</p>}
    </>
  );
};
