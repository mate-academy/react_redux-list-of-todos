import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../api';
import {
  ActionTypes,
  curentUserAction,
  getCurrentUserSelector,
  getSelectedUserIdSelector,
} from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const selectedUserId = useSelector(getSelectedUserIdSelector);

  const dispatch = useDispatch();

  const getUserFromServer = async (currentUserId: number) => {
    const userFromServer = await getUsers(currentUserId);

    dispatch(curentUserAction(userFromServer));
  };

  useEffect(() => {
    getUserFromServer(selectedUserId);
  }, [selectedUserId]);

  const selectUser = (userId: number) => {
    dispatch({ type: ActionTypes.SELECTED_USER, selectedUserId: userId });
  };

  return (
    <div
      className="CurrentUser"
    >
      {currentUser && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">
            {currentUser.name}
          </h3>
          <p className="CurrentUser__email">
            {currentUser.email}
          </p>
          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>
          <button
            onClick={() => selectUser(0)}
            type="button"
            data-cy="userButton"
            className="CurrentUser__clear button-user"
          >
            Clear user
          </button>
        </>
      )}
    </div>
  );
};
