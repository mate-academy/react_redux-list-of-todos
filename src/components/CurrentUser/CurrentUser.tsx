import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { userInfo } from '../../store/user';

export const CurrentUser: React.FC = () => {
  const { user, error, isLoading } = useAppSelector(userInfo);

  // eslint-disable-next-line no-console
  console.log(user);

  if (isLoading) {
    return (
      <div>
        Loading ...
      </div>
    );
  }

  if (error) {
    return (
      <div>{error}</div>
    );
  }

  if (!user) {
    return (
      <div>no user selected</div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
