import React from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../store/selectors';
import { clearUserAction, clearUserIdAction } from '../../store/actions';

export const CurrentUser : React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleClick = () => {
    dispatch(clearUserIdAction());
    dispatch(clearUserAction());
  };

  return (
    <div className="CurrentUser">
      {
        user
          ? (
            <>
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {user.id}
                </span>
              </h2>
              <h3 className="CurrentUser__name">
                {user.name}
              </h3>
              <p className="CurrentUser__email">
                {user.email}
              </p>
              <p className="CurrentUser__phone">
                {user.phone}
              </p>
            </>
          )
          : (
            <span>
              Can not find a User
            </span>
          )
      }
      <br />
      <button
        className="button"
        type="button"
        onClick={handleClick}
      >
        Clear
      </button>

    </div>
  );
};
