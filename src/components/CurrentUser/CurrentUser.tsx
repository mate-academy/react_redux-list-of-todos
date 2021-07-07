import React from 'react';
import { User } from '../../store/currentUserStore';

import './CurrentUser.scss';

type Props = {
  user: User;
  onClear: () => void;
};

export const CurrentUser: React.FC<Props> = ({ children, user, onClear }) => {
  return (
    <div className="CurrentUser">
      {children}
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {user.id}
        </span>
      </h2>
      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={() => {
          onClear();
        }}
      >
        Clear
      </button>
    </div>
  );
};
