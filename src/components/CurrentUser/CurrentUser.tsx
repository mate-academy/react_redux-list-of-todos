import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, setUser } from '../../store';

import './CurrentUser.scss';

import { getUser } from '../../api/api';

type Props = {
  userId: number;
  selectUser: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const dispatch = useDispatch();
  const user = useSelector(setUser);

  const getUserFromServer = async () => {
    const userFromServer = await getUser(userId);

    dispatch(loadUser(userFromServer));
  };

  useEffect(() => {
    getUserFromServer();
  }, [userId]);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {user.name}
          </h3>

          <p className="CurrentUser__email">
            {user.email}
          </p>

          <p className="CurrentUser__phone">
            {user.phone}
          </p>

          <button
            type="button"
            className="CurrentUser__clearButton"
            onClick={() => selectUser(0)}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
