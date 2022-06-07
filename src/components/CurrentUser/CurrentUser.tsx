import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  id: number,
  selectUser: (id: number) => void;
}

export const CurrentUser: React.FC<Props> = ({
  id,
  selectUser,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getCurrentUser = async (userId: number) => {
    const response = await getUser(userId);

    setCurrentUser(response);
  };

  useEffect(() => {
    getCurrentUser(id);
  }, [id]);

  return (
    <>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:&nbsp;
              {id}
            </span>
          </h2>

          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {currentUser.name}
          </h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>
        </div>
      )}
      <button
        type="button"
        className="CurrentUser__clear button"
        onClick={() => selectUser(0)}
      >
        Clear
      </button>
    </>
  );
};
