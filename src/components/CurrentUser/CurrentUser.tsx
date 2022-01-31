import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../api/api';
import { RootState } from '../../types/RootState';
import classes from './CurrentUser.module.scss';

export const CurrentUser:React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userInfoReducer.user);

  return (
    <>
      {user ? (
        <div className={classes.user}>
          <h2 className={classes.title}>
            {`Selected user: ${user.id}`}
          </h2>

          <h3 className={classes.userName}>{user.name}</h3>
          <p className={classes.userEmail}>{user.email}</p>
          <p className={classes.userPhone}>{user.phone}</p>
          <button
            className={classes.clearBtn}
            type="button"
            onClick={() => dispatch(fetchUserInfo(0))}
          >
            Clear
          </button>
        </div>
      ) : (
        <h2>Not select user</h2>
      )}
    </>
  );
};
