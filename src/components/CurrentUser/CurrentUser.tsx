import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersById } from '../../api';
import { addUserAction, selectUserIdAction } from '../../store/actions';
import { getUserSelector, selectUserIdSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(getUserSelector);
  const selectedUserId = useSelector(selectUserIdSelector);

  useEffect(() => {
    getUsersById(selectedUserId)
      .then(user => dispatch(addUserAction(user)));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${selectedUser?.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser?.username}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>
      <button
        className="TodoList__user-button button"
        type="button"
        onClick={() => {
          dispatch(selectUserIdAction(0));
        }}
      >
        Clear
      </button>
    </div>
  );
};
