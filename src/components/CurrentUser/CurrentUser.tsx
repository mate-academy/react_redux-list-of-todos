import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStateUser, actions } from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getStateUser);
  const dispatch = useDispatch();

  const handleClearClick = () => {
    dispatch(actions.clear);
  };

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <div className="CurrentUser__clear">
        <button
          type="button"
          className="CurrentUser__clear-button"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </div>
  );
};
