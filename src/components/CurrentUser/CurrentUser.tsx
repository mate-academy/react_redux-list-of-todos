import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedUserByIdSelector } from '../../store';
import { getUser } from '../../api';

import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const currentUserId = useSelector(getSelectedUserByIdSelector);

  useEffect(() => {
    const newUser = async () => {
      const currentUser = await getUser(currentUserId);

      setUser(currentUser);
    };

    newUser();
  }, [currentUserId]);

  const cleanUser = useCallback(() => {
    dispatch({ type: 'SELECT_ID', id: 0 });
  }, []);

  return (
    <>
      {user && (
        <>
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
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>

          <button
            type="button"
            className="CurrentUser__button"
            onClick={() => cleanUser()}
          >
            Clear
          </button>
        </>
      )}
    </>
  );
};
