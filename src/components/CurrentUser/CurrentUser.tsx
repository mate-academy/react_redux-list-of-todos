import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api';
import { getUserSelector } from '../../store';
import './CurrentUser.scss';

type Props = {
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromServer = async () => {
      dispatch({ type: 'USER_LOADING', user: await getUser(userId) });
    };

    userFromServer();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

      <h3 data-cy="userName" className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        onClick={() => dispatch({ type: 'SELECT_USER_ID', selectedUserId: 0 })}
        type="button"
        className="CurrentUser__clear button"
      >
        Clear
      </button>
    </div>
  );
};
