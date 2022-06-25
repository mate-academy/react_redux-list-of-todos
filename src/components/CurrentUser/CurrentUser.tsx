import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';

interface Props {
  selectedUserId: number;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>;
}

export const CurrentUser: React.FC<Props> = ({
  selectedUserId, setSelectedUserId,
}) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUser(selectedUserId)
      .then(result => setUser(result))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error, 'something wrong with syntax');
      });
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <button
        className="
              TodoList__user-button
              TodoList__user-button--red
              button
            "
        type="button"
        onClick={() => {
          setSelectedUserId(0);
        }}
      >
        clear
      </button>

      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedUserId}`}</span>
      </h2>

      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {user?.name}
      </h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
};
