import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(getUserSelector);

  return (
    <>
      {selectedUser
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {selectedUser.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>

            <button
              type="button"
              className="button"
              onClick={() => dispatch(clearUser())}
            >
              Clear
            </button>
          </>
        )
        : (
          <p className="CurrentUser__error">
            User not selected
          </p>
        )}
    </>
  );
});
