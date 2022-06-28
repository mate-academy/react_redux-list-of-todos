import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  const clearUser = () => dispatch(setUserAction(null));

  if (!user) {
    return <p>No user selected</p>;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 data-cy="userName" className="CurrentUser__name">
        {user.name}
      </h3>
      <p className="CurrentUser__email">
        {user.email}
      </p>
      <p className="CurrentUser__phone">
        {user.phone}
      </p>
      <button
        className="button"
        type="button"
        onClick={() => {
          clearUser();
        }}
      >
        Clear
      </button>
    </div>
  );
};
