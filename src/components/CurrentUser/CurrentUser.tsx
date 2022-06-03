import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import { User } from '../../store/types';
import './CurrentUser.scss';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props>
= ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch((error) => setErrorText(error.toString()));
  }, [userId]);

  if (errorText) {
    return (
      <div>
        {errorText}
      </div>
    );
  }

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span data-cy="userButton">
              Selected user:
              {userId}
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
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};
