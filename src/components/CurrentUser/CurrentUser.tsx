import React, { useEffect, useCallback } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api';
import { selectors, actions } from '../../store';

export const CurrentUser: React.FC = () => {
  const user = useSelector(selectors.loadUser);
  const userId = useSelector(selectors.getUserId);
  const error = useSelector(selectors.getError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function response() {
      try {
        const userFromServer = await getUser(userId);

        dispatch(actions.getUser(userFromServer));
      } catch {
        dispatch(actions.getError("Can't load user"));
      }
    }

    response();
  }, [userId]);

  const clear = useCallback((value: number) => {
    dispatch(actions.selectUser(value));
  }, []);

  return (
    <>
      {user ? (
        <>
          <div className="CurrentUser">

            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

            <h3 className="CurrentUser__name" data-cy="userName">
              {user.name}
            </h3>
            <p className="CurrentUser__email">
              {user.email}
            </p>
            <p className="CurrentUser__phone">
              {user.phone}
            </p>
          </div>

          <button
            type="button"
            className="CurrentUser__clear"
            onClick={() => clear(0)}
          >
            Clear User
          </button>
        </>
      )
        : (
          <p>
            {error}
          </p>
        )}
    </>
  );
};
