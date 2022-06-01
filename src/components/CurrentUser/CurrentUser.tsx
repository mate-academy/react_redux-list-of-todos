import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromServer } from '../../api/api';
import {
  getLoadedUser,
  getSelectedUser,
  isLoadingUser,
  loadedUser,
  toggleUserLoading,
} from '../../store';
import './CurrentUser.scss';

type Props = {
  onClearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ onClearUser }) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoadedUser);
  const selectedUser = useSelector(getSelectedUser);
  const loading = useSelector(isLoadingUser);

  const getUser = useCallback(async () => {
    dispatch(loadedUser(null));

    if (selectedUser) {
      dispatch(toggleUserLoading());
      try {
        const newUser = await getUserFromServer(selectedUser);

        dispatch(loadedUser(newUser));
      } catch {
        dispatch(loadedUser(null));
      } finally {
        dispatch(toggleUserLoading());
      }
    }
  }, [selectedUser]);

  useEffect(() => {
    getUser();
  }, [selectedUser]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {selectedUser}
        </span>
      </h2>
      {loading && ('Loading...')}
      {!loading && (
        <>
          <h3 className="CurrentUser__name" data-cy="userName">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          {user && (
            <button
              className="CurrentUser__clear button"
              type="button"
              onClick={onClearUser}
            >
              Clear
            </button>
          )}
        </>
      )}
      {(!user && !loading) && (
        <div className="CurrentUser__error">Can&apos;t load user</div>
      )}
    </div>
  );
};
