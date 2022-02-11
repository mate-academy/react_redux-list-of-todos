import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { loadUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  const handleUserClear = () => {
    dispatch(loadUserAction(null));
  };

  if (!user) {
    return <div>No user selected</div>;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        className="button"
        type="button"
        onClick={() => handleUserClear()}
      >
        Clear
      </button>
    </div>
  );
};
