import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import PropTypes from 'prop-types';
import { User } from '../../types'; // User, RootState

import {
  getUserId,
  getUserFromServer,
  getUserInfo,
  setUser
} from '../../store';
import './CurrentUser.scss';

// export const CurrentUser: FC<PropState> = ({ userId }) => {
  export const CurrentUser: FC = () => {

  // const id = userId;
  const dispatch = useDispatch();

  const user: User = useSelector(getUserInfo);
  const userId: number = useSelector(getUserId);

  const fetchUserData = () => {
    console.log('getUserFromServer', userId);
    return dispatch(getUserFromServer(userId));
  };

  useEffect(() => {
    // console.log('useEffect CurrentUser', userId);
    console.log('useEffect 3');
    if (userId && userId > 0) {
      fetchUserData();
      console.log('useEffect 3', user);
    }
  }, [userId]);

  const clearUser = () => {
    dispatch(setUser({}));
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <div className="CurrentUser__buttons">
        <button
          type="button"
          className="button"
          onClick={clearUser}
        >
          Clear user
        </button>
      </div>
    </div>
  );
}

//onClick={/*user.clearUser*/}
// CurrentUser.propTypes = {
//   userId: PropTypes.number.isRequired,
// };
