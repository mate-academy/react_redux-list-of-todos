import React from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  getHasUserLoadingError,
} from '../../store/selectors';
import { setUser } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const hasUserLoadingError = useSelector(getHasUserLoadingError);

  return (
    <>
      {hasUserLoadingError && (
        <span className="CurrentUser__error-message">An error occurred while loading user</span>
      )}
      {user && !hasUserLoadingError && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user?.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={() => dispatch(setUser(null))}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
