import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);

  const ClearUser = () => {
    dispatch(loadUserAction(null));
  };

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
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <br />
      <button
        type="button"
        onClick={ClearUser}
      >
        Clear
      </button>
    </div>
  );
};
