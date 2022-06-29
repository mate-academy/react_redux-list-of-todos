import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { setUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);

  const clearUser = () => dispatch(setUserAction(null));

  if (!user) {
    return <p>No selected user</p>;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        type="button"
        onClick={clearUser}
        className="button"
      >
        Clear
      </button>
    </div>
  );
};
