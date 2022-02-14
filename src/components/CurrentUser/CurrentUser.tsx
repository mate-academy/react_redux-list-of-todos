import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';
import { clearSelectedUser } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((getUserSelector));

  const handelClearUser = () => {
    dispatch(clearSelectedUser());
  };

  if (!user) {
    return (
      <div>No selected user</div>
    );
  }

  return (
    <>
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${user.id}`}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <br />
      </div>
      <button
        onClick={handelClearUser}
        type="button"
        className="button TodoList__user-button--selected clear-button"
      >
        Clear
      </button>
    </>
  );
};
