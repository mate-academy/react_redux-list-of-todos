import React, { useCallback, useEffect } from 'react';
import './CurrentUser.scss';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api/api';
import { useTypesSelector } from '../../store';
import { getUsersFromServer, setLoadingError } from '../../store/actions';

 type Props = {
   selectUser: (x:number) => void
 };

export const CurrentUser: React.FC<Props> = ({ selectUser }) => {
  const dispatch = useDispatch();
  const {
    user,
    userId,
    isLoadingError,
  } = useTypesSelector(state => state.todo);

  const userFromServer = useCallback(async () => {
    const API_USER_URL = `https://mate.academy/students-api/users/${userId}`;

    try {
      const getUsers = await getUser(API_USER_URL);

      dispatch(setLoadingError(false));
      dispatch(getUsersFromServer(getUsers));
    } catch {
      dispatch(getUsersFromServer(null));
      dispatch(setLoadingError(true));
    }
  }, [userId]);

  useEffect(() => {
    userFromServer();
  }, [userId]);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {userId}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>

          <button
            type="button"
            className="button"
            onClick={() => {
              selectUser(0);
            }}
          >
            Clear
          </button>
        </div>
      )}

      {isLoadingError && (
        <div className="CurrentUser">
          <h3 className="CurrentUser__name">
            No user info
          </h3>
        </div>
      )}
    </>
  );
};
