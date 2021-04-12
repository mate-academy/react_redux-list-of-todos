import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getUserFromServer, getNewUser, getUserID, setUserID,
} from '../../store';
import { User } from '../../utils/types';
import './UserInfo.scss';

export const UserInfo = () => {
  const dispatch = useDispatch();
  const user: User = useSelector(getNewUser);
  const userId: number = useSelector(getUserID);

  const fetchUserDetails = () => {
    return dispatch(getUserFromServer(userId));
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return (
      <h3 className="UserInfo__selected"> No User Selected </h3>
    );
  }

  return (
    <div className="UserInfo">
      <h2 className="UserInfo__title">
        <span>
          Selected user#
          {user.id}
        </span>
      </h2>
      <h3 className="UserInfo__name">{user.name}</h3>
      <p className="UserInfo__email">{user.email}</p>
      <p className="UserInfo__phone">{user.phone}</p>
      <button
        type="button"
        className="UserInfo__button"
        onClick={() => {
          if (user.id) {
            dispatch(setUserID(0));
          }
        }}
      >
        Clear User
      </button>
    </div>
  );
};
