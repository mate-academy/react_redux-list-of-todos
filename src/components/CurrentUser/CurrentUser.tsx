import React from 'react';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  clearUser: () => void,
  userData: User,
};

export const CurrentUser: React.FC<Props> = React.memo(({
  clearUser,
  userData,
}) => {
  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${userData.id}`}</span>
      </h2>
      <h3 className="CurrentUser__name">{userData.name}</h3>
      <p className="CurrentUser__email">{userData.email}</p>
      <p className="CurrentUser__phone">{userData.phone}</p>
      <button
        className="btn btn-danger"
        type="button"
        onClick={clearUser}
      >
        Clear User
      </button>
    </div>
  );
});
