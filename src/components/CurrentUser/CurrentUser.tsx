import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromServer } from '../../api/api';
import {
  getLoadedUser,
  getSelectedUser,
  isLoadingUser,
  loadedUser,
  toggleUserLoading,
  selectedUser,
} from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getLoadedUser);
  const currUser = useSelector(getSelectedUser);
  const loading = useSelector(isLoadingUser);

  const clearUser = useCallback(() => {
    dispatch(selectedUser(null));
  }, []);

  const getUser = useCallback(async () => {
    dispatch(loadedUser(null));

    if (currUser) {
      dispatch(toggleUserLoading());
      try {
        const newUser = await getUserFromServer(currUser);

        dispatch(loadedUser(newUser));
      } catch {
        dispatch(loadedUser(null));
      } finally {
        dispatch(toggleUserLoading());
      }
    }
  }, [currUser]);

  useEffect(() => {
    getUser();
  }, [currUser]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {currUser}
        </span>
      </h2>
      {!loading && (
        <>
          <h3 className="CurrentUser__name" data-cy="userName">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          {user && (
            <button
              className="CurrentUser__clear button"
              type="button"
              onClick={clearUser}
            >
              Clear
            </button>
          )}
        </>
      )}
      {loading && (
        <div className="CurrentUser__error">Loading...</div>
      )}
      {(!user && !loading) && (
        <div className="CurrentUser__error">Can&apos;t load user</div>
      )}
    </div>
  );
};
