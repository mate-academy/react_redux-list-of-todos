import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../api/api';
import { loadHasErrorAction, loadUserAction, selectUserId } from '../../store/actions';
import { getError, getSelectedUserId, getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const hasError = useSelector(getError);
  const user = useSelector(getUserSelector);
  const selectedUserId = useSelector(getSelectedUserId);

  useEffect(() => {
    (async () => {
      try {
        const userFromServer = await getUserById(selectedUserId);

        dispatch(loadHasErrorAction(false));
        dispatch(loadUserAction(userFromServer));
      } catch {
        dispatch(loadHasErrorAction(true));
      }
    })();
  }, [selectedUserId]);

  const handleDelete = () => {
    dispatch(selectUserId(0));
  };

  if (hasError) {
    return (<p>ERROR user not found</p>);
  }

  return (
    <div className="CurrentUser">
      {!user
        ? 'loading...'
        : (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUserId}`}</span></h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="button TodoList__user-button--selected"
              onClick={handleDelete}
            >
              remove
            </button>
          </>
        )}
    </div>
  );
};
