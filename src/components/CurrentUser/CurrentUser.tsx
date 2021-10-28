import React from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import { holdUser } from '../../store/todos/actionTodos';

export const CurrentUser = React.memo(() => {
  const { user } = useSelector((state: Initial) => state.reducerTodos);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-console
  console.log('current');

  return (
    <>
      { user ? (
        <div className="CurrentUser">

          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="CurrentUser__clear button"
            type="button"
            onClick={() => dispatch(holdUser())}
          >
            Hide User

          </button>
        </div>
      ) : (
        <h3>404</h3>
      )}
    </>
  );
});
