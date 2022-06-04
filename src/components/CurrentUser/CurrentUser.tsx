import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromServer } from '../../api/api';
import { actions, selectors } from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const user = useSelector(selectors.loadUser);
  const userId = useSelector(selectors.getUserId);
  const dispatch = useDispatch();

  const [errorLoad, setErrorLoad] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        setErrorLoad('');
        dispatch(actions.loadUser(null));
        const userFromServer = await getUserFromServer(userId);

        dispatch(actions.loadUser(userFromServer));
      } catch {
        setErrorLoad('Can not load user!');
      }
    };

    getUser();
  }, [userId]);

  return (
    <>
      {user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">
            {user.name}
          </h3>

          <p className="CurrentUser__email">
            {user.email}
          </p>

          <p className="CurrentUser__phone">
            {user.phone}
          </p>

          <button
            className="button button__clear"
            type="button"
            onClick={() => (
              dispatch(actions.selectUser(0))
            )}
          >
            Clear
          </button>
        </div>
      ) : (
        <p>{errorLoad}</p>
      )}
    </>
  );
};
