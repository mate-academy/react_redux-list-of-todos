import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedUserId } from '../../store';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
};

interface User {
  name: string,
  email: string,
  phone: string,
}

const defaultUser = {
  name: '-',
  email: '-',
  phone: '-',
};

export const CurrentUser: React.FC<Props> = ({
  userId,
}) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setHasLoadingError(false);
    setIsLoading(true);

    getUser(userId)
      .then(currentUser => {
        if (!currentUser.error) {
          setUser(currentUser);
        } else {
          setHasLoadingError(true);
        }

        setIsLoading(false);
      });
  }, [userId]);

  const { name, email, phone } = user;
  const currentUserContent = hasLoadingError ? 'Some error...'
    : (
      <>
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          onClick={() => dispatch(setSelectedUserId(0))}
          className="button"
        >
          Clear
        </button>
      </>
    );

  return (
    <div className="CurrentUser">
      {isLoading ? 'Loading...' : currentUserContent}
    </div>
  );
};
