/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestUser } from '../../api/api';
import { setUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const userSelector = useSelector(getUserSelector);

  useEffect(() => {
    requestUser(userSelector).then(promise => setSelectedUser(promise));
  }, [userSelector]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser?.id}`}</span></h2>

      <h3 data-cy="userName" className="CurrentUser__name">{selectedUser?.name}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
      <button
        type="button"
        className="TodoList__user-button button"
        onClick={
          () => dispatch(setUserAction(0))
        }
      >
        Clear
      </button>
    </div>
  );
};
