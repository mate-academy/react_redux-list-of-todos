import React from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  if (!user) {
    return (
      <div>No selected user</div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        type="button"
        className="button"
        onClick={() => dispatch(loadUserAction(null))}
      >
        Remove
      </button>
    </div>
  );
};
