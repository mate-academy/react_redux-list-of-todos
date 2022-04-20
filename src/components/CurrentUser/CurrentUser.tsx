import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../api/api';
import {
  getSelectedUserId, getUser, setSelectedUserId, setUser,
} from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = memo(() => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const selectedUserId = useSelector(getSelectedUserId);

  useEffect(() => {
    fetchUser(selectedUserId)
      .then(person => dispatch(setUser(person)));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        type="button"
        className="CurrentUser__clear"
        onClick={() => dispatch(setSelectedUserId(0))}
      >
        Clear
      </button>
    </div>
  );
});
