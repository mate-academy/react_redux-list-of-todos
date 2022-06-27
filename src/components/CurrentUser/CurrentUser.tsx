import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersSelector } from '../../store/selectors';
import { setUserAction } from '../../store/action';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUsersSelector);
  const dispatch = useDispatch();

  if (!user) {
    return <p>No selected user</p>;
  }

  return (
    <div className="CurrentUser">
      <button
        className="
              TodoList__user-button
              TodoList__user-button--red
              button
            "
        type="button"
        onClick={() => {
          dispatch(setUserAction(null));
        }}
      >
        clear
      </button>

      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {user.name}
      </h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
