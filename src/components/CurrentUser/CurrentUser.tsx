import React, { useEffect } from 'react';
import './CurrentUser.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/api';
import {
  loadUserAC,
  loadUserSelector,
  selectUserIdAC,
  selectUserIdSelector,
  userLoadErrorAC,
  userLoadErrorSelector,
} from '../../store';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(loadUserSelector);
  const userId = useSelector(selectUserIdSelector);
  const errorMessage = useSelector(userLoadErrorSelector);

  useEffect(() => {
    async function response() {
      try {
        const userFromServer = await getUser(userId);

        dispatch(loadUserAC(userFromServer));
      } catch {
        dispatch(loadUserAC(null));
        dispatch(userLoadErrorAC('Cant load user from server'));
      }
    }

    response();
  }, [userId]);

  const handleClear = () => {
    dispatch(selectUserIdAC(0));
  };

  return (
    <div>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user?.id}`}
            </span>
          </h2>

          <h3
            data-cy="userName"
            className="CurrentUser__name"
          >
            {user?.name}
          </h3>

          <p className="CurrentUser__email">
            {user?.email}
          </p>

          <p className="CurrentUser__phone">
            {user?.phone}
          </p>

          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={() => handleClear()}
          >
            Clear User
          </button>
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};
