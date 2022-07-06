/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector, setUserAction, setSelectedTodoId } from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  if (user === null) {
    return (
      <div>
        No user selected!!!
      </div>
    );
  }

  return (
    <div className="CurrentUser">
      <>
        {user.id === 0 ? (
          'Error, user not found!!!'
        ) : (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${user.id}`}
              </span>
            </h2>

            <h3
              className="CurrentUser__name"
              data-cy="userName"
            >
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <h3>
              <button
                type="button"
                className="CurrentUser__title button"
                onClick={() => {
                  dispatch(setUserAction(null));
                  dispatch(setSelectedTodoId(0));
                }}
              >
                Clear
              </button>
            </h3>
          </>
        )}
      </>
    </div>
  );
};
