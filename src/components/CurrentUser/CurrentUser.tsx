import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
            type="button"
            onClick={() => dispatch(loadUserAction(null))}
          >
            Clear
          </button>
        </>
      ) : <p>User not found...</p>}
    </div>
  );
};
