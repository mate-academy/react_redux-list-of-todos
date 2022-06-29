import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../react-app-env';
import { setUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const user: User | null = useSelector(getUserSelector);

  return (
    <div className="user">
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>{user.phone}</h2>
          <h2>{user.email}</h2>

          <button
            type="button"
            className="user__remove"
            onClick={() => {
              dispatch(setUserAction(null));
            }}
          >
            X
          </button>
        </>
      ) : (
        <h1>Nothing selected</h1>
      )}
    </div>
  );
};
