import React from 'react';
import './CurrentUser.scss';

type Props = {
  clearUser: () => void;
  currentUserData: User;
};

export const CurrentUser: React.FC<Props> = ({
  clearUser,
  currentUserData,
}) => {
  if (currentUserData) {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {currentUserData.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{currentUserData.name}</h3>
        <p className="CurrentUser__email">{currentUserData.email}</p>
        <p className="CurrentUser__phone">{currentUserData.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={clearUser}
        >
          Clear
        </button>
      </div>
    );
  }

  return (
    <b>User not found</b>
  );
};
