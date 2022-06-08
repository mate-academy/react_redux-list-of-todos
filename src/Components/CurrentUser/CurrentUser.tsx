import './CurrentUser.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsers } from '../../api/api';
import { getSelectedUserId } from '../../store/selectors';
import { User } from '../../types';

export const CurrentUser: React.FC = () => {
  const selectedUserId = useSelector(getSelectedUserId);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUsers(selectedUserId)
      .then(userFromServer => setUser(userFromServer));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {user?.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
        </>
      ) : <p> Loading...</p>}

    </div>
  );
};
