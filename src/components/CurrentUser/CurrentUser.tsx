import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserSelector);

  const cancelSelectUser = () => {
    dispatch(loadUserAction(null));
  };

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        type="button"
        onClick={cancelSelectUser}
        className="CurrentUser__button button"
      >
        Clear
      </button>
    </div>
  );
};
