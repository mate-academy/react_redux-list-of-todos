import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api';
import {
  ActionTypes,
  currentUserAction,
  getCurrentUserSelector,
  getSelectedUserIdSelector,
} from '../../store/store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const currentUser = useSelector(getCurrentUserSelector);
  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const dispatch = useDispatch();

  const getCurrentUser = async (currentUserId: number) => {
    const UserFromServer = await getUser(currentUserId);

    dispatch(currentUserAction(UserFromServer));
  };

  useEffect(() => {
    getCurrentUser(selectedUserId);
  }, [selectedUserId]);

  const selectUser = (userId: number) => {
    dispatch({ type: ActionTypes.SelectUserId, selectedUserId: userId });
  };

  return (
    <div>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{currentUser.name}</h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>
        </div>
      )}
      <button
        type="button"
        className="CurrentUser__button button"
        onClick={() => selectUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
