import React from 'react';
import './CurrentUser.scss';
import { useDispatch } from 'react-redux';
import { User } from '../interfaces';
import { chooseUserId } from '../../store/chooseUserId';

type CurrentUserProps = {
  user: User;
};

export const CurrentUser: React.FC<CurrentUserProps> = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user:${user.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        className="beautiful.button"
        type="button"
        onClick={() => dispatch(chooseUserId(0))}
      >
        Clear user details!
      </button>
    </div>
  );
};

export default CurrentUser;
