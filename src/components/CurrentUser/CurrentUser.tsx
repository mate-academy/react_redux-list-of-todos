import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';
import './CurentUser.scss';

export const CurrentUser:React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  if (!user) {
    return (
      <p>No user selected</p>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        type="button"
        className="TodoList__user-button--selected button"
        onClick={() => dispatch(setUserAction(null))}
      >
        Clear
      </button>
    </div>
  );
};
