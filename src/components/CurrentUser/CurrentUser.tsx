import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

import { actions } from '../../store/actions';
import { selectors } from '../../store/index';

export const CurrentUser: React.FC = () => {
  const currentUser = useSelector(selectors.loadUserSelector);
  const dispatch = useDispatch();
  const selectedUserId = useSelector(selectors.getUsersIdSelector);
  const error = useSelector(selectors.loadErrorSelector);

  useEffect(() => {
    async function response() {
      try {
        const serverUser = await getUser(selectedUserId);

        dispatch(actions.loadUserAction(serverUser));
      } catch {
        dispatch(actions.loadErrorAction('Can not load user'));
      }
    }

    response();
  }, [selectedUserId]);

  const deleteUser = useCallback((userId: number) => {
    dispatch(actions.selectUserAction(userId));
  }, []);

  return (
    <>
      {currentUser ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>
          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {currentUser.name}
          </h3>
          <p className="CurrentUser__email">
            {currentUser.email}
          </p>
          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>
          <button
            type="button"
            className="CurrentUser__button"
            onClick={() => deleteUser(0)}
          >
            Clear
          </button>
        </div>
      )
        : (
          <p>
            {error}
          </p>
        )}
    </>
  );
};
