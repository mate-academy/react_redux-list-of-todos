import React from 'react';
import './CurrentUser.scss';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);

  if (!user) {
    return <p>No selected user</p>;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
