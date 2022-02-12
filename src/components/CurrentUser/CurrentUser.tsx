import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';
import { loadUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div>No selected user</div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        className="button CurrentUser__button"
        type="button"
        onClick={() => dispatch(loadUserAction(null))}
      >
        Clear
      </button>
    </div>
  );
};
