import React, { useEffect } from 'react';
import './CurrentUser.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUserSelector } from '../../store/selectors';
import { getUserById } from '../../api/todos';
import { loadUserAction, setUserId } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const userId = useSelector(getUserId);

  useEffect(() => {
    const loadUserFromServer = async () => {
      const userFromServer = await getUserById(userId);

      dispatch(loadUserAction(userFromServer));
    };

    loadUserFromServer();
  }, [userId]);

  const user = useSelector(getUserSelector);

  return (
    <div className="CurrentUser box">
      {user && (
        <>
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone pb-2">{user.phone}</p>
        </>
      )}

      <button
        className="button is-danger"
        type="button"
        onClick={() => dispatch(setUserId(0))}
      >
        Clear
      </button>
    </div>
  );
};
