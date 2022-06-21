import React, { useCallback, useEffect } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/api';
import { actions, selectors } from '../../store';

export const CurrentUser: React.FC = () => {
  const userId = useSelector(selectors.getUserId);
  const error = useSelector(selectors.getMessageError);
  const user = useSelector(selectors.loadUser);
  const dispatch = useDispatch();

  async function response() {
    try {
      const gottenUser = await getUser(userId);

      dispatch(actions.getUser(gottenUser));
    } catch {
      dispatch(actions.getError(`Can not load the user.
        Please reload the page.`));
    }
  }

  useEffect(() => {
    response();
  }, [userId]);

  const resetUserId = useCallback(() => {
    dispatch(actions.selectUser(0));
  }, []);

  return (
    <>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:&nbsp;
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            onClick={() => resetUserId()}
            className="CurrentUser__clear"
          >
            Clear
          </button>
        </div>
      ) : (<p>{error}</p>)}
    </>
  );
};
