import React, { useEffect } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserIdAction, State } from '../../store';
import { getUser } from '../../api';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state: State) => state.selectedUserId);
  const user = useSelector((state: State) => state.selectedUser);
  const isUserValid = useSelector((state: State) => state.isUserValid);

  useEffect(() => {
    dispatch(getUser(selectedUserId));
  }, [selectedUserId]);

  const clearUserInfo = () => {
    dispatch(selectUserIdAction(0));
  };

  return (
    <div className="CurrentUser">
      {isUserValid
        ? (
          <div>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button className="button" type="button" onClick={clearUserInfo}>Clear</button>
          </div>
        )
        : <h1>User not found</h1>}
    </div>
  );
};
