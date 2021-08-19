import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { User } from '../../types';

import {
  getUserId,
  setUserSelected,
  getUserFromServer,
  getUserInfo,
  setUser
} from '../../store';
import './CurrentUser.scss';

export const CurrentUser: FC = () => {

  const dispatch = useDispatch();

  const user: User | null = useSelector(getUserInfo);
  const userId: number = useSelector(getUserId);

  const fetchUserData = () => {
    return dispatch(getUserFromServer(userId));
  };

  useEffect(() => {
    if (userId && userId > 0) {
      fetchUserData();
    }
  }, [userId]);

  const clearUser = () => {
    dispatch(setUser(null));
    dispatch(setUserSelected(false));
  }

  if (!user) {
    return (
      <p className="warning pl-30">Loading user data has failed.</p>
    )
  } else {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user with ID ${userId}`}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="button"
          onClick={clearUser}
        >
          Clear user
        </button>
      </div>
    );
  }
}
