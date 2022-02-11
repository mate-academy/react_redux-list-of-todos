import './CurrentUser.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { LoadUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  const clearUser = () => {
    dispatch(LoadUserAction(null));
  };

  return (
    user && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="button button--centered"
          type="button"
          onClick={clearUser}
        >
          Clear
        </button>
      </div>
    )
  );
};
