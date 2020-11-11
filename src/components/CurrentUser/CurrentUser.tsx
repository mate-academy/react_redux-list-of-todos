import React, { useEffect } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { chooseUserId, getUser,
  setUser, setUserId } from '../../store';
 import { userFromServer } from '../api/api';


export const CurrentUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const selectedUserId = useSelector(setUserId);

  useEffect(() => {
      const fetchUser = async() => {
        const result = await userFromServer(selectedUserId);
        dispatch(setUser(result));
      };

      fetchUser();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user !== null && selectedUserId
        ? (
          <>
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
          </>
        )
        : 'No user selected'}
    </div>
  );
};

export default CurrentUser;