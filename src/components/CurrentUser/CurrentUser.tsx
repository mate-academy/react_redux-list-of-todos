import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserActions } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  return (
    <>
      {user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="button CurrentUser__clear"
            type="button"
            onClick={() => dispatch(loadUserActions(null))}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
