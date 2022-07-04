import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { setUserAction } from '../../store/action';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  return (
    <>
      {user
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected User: ${user.id}`}</span>
            </h2>

            <button
              type="button"
              className="button is-danger"
              onClick={() => {
                dispatch(setUserAction(null));
              }}
            >
              Clear
            </button>

            <h3
              className="CurrentUser__name"
              data-cy="userName"
            >
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>

        )
        : (
          'No user selected'
        )}
    </>
  );
};
