import React from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSelector } from '../../store/user/selectors';
import { clearUser } from '../../store/user/actions';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearUser());
  };

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="button"
            type="button"
            onClick={handleClick}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
