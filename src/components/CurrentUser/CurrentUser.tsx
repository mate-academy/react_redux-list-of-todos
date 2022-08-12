import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CurrentUser.scss';
import { getUserSelector }
  from '../../store/selectors';
import { setUserAction } from '../../store/action';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  return (
    <div className="CurrentUser">
      {user && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button type="button" onClick={() => dispatch(setUserAction(null))}>
            Clear
          </button>
        </>
      )}
    </div>
  );
};
