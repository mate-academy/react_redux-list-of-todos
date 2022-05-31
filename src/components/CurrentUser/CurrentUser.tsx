import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CurrentUser.scss';
import { getUser } from '../../api';

import { selectors, actions } from '../../store';

export const CurrentUser: React.FC = () => {
  const userId = useSelector(selectors.getUserId);
  const error = useSelector(selectors.getError);
  const user = useSelector(selectors.loadUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function response() {
      try {
        const userFromServer = await getUser(userId);

        dispatch(actions.getUser(userFromServer));
      } catch {
        dispatch(actions.getError('Can not load user'));
      }
    }

    response();
  }, [userId]);

  return (
    <>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            onClick={() => dispatch(actions.selectUser(0))}
            className="CurrentUser__clear"
          >
            Clear
          </button>
        </div>
      ) : (<p>{error}</p>)}
    </>
  );
};
