import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, setUser } from '../../store';

import { getUsers } from '../../api/api';

import './CurrentUser.scss';

type Props = {
  userId: number;
  selectUser: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const dispatch = useDispatch();
  const user = useSelector(setUser);

  const request = async () => {
    const userFromServer = await getUsers(userId);

    dispatch(loadUser(userFromServer));
  };

  useEffect(() => {
    request();
  }, [userId]);

  return (
    <>
      {user && (
        <div className="currentUser">
          <h2 className="currentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3 className="currentUser__name">
            {user.name}
          </h3>

          <p className="currentUser__email">
            {user.email}
          </p>

          <button
            type="button"
            className="currentUser__clearButton"
            onClick={() => selectUser(0)}
          >
            Remove
          </button>
        </div>
      )}
    </>
  );
};
