import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { setUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  if (!user) {
    return <p>No seelected user</p>;
  }

  return (
    <div className="CurrentUser">
      <button
        type="button"
        data-cy="userButton"
        onClick={() => dispatch(setUserAction(null))}
      >
        Clear
      </button>
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
