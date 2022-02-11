import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CurrentUser.scss';
import { getUserSelector } from '../../store/selectors';
import { clearUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);

  const clearUser = () => dispatch(clearUserAction());

  if (!user) {
    return (
      <div>No user selected</div>
    );
  }

  return (
    <>
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
      <button
        type="button"
        className="CurrentUser__clear"
        onClick={clearUser}
      >
        Clear
      </button>
    </>
  );
};
