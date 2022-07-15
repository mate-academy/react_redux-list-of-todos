import React from 'react';
import './CurrentUser.scss';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../store/Selectors';

export const CurrentUser: React.FC = () => {
  const currentUser = useSelector(getUserSelector);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {currentUser?.id}
        </span>
      </h2>

      <h3
        className="CurrentUser__name"
      >
        {currentUser?.name}
      </h3>
      <p
        className="CurrentUser__email"
      >
        {currentUser?.email}
      </p>
      <p className="CurrentUser__phone">
        {currentUser?.phone}
      </p>
    </div>
  );
};
