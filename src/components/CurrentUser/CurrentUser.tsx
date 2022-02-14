import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { loadUserAction } from '../../store/actions';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const currentUser = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const clearUserHandler = () => {
    dispatch(loadUserAction(null));
  };

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {currentUser?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{currentUser?.name}</h3>
      <p className="CurrentUser__email">{currentUser?.email}</p>
      <p className="CurrentUser__phone">{currentUser?.phone}</p>
      <div className="CurrentUser__button-container">
        <div className="CurrentUser__button">
          <button
            className="button"
            type="button"
            onClick={clearUserHandler}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
