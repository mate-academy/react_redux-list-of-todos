import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../api/api';
import { addUserAction, selectUserIdAction } from '../../store/actions';
import { getUserSelector, selectedUserIdSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(getUserSelector);
  const selectedId = useSelector(selectedUserIdSelector);

  const clearUser = () => dispatch(selectUserIdAction(0));

  useEffect(() => {
    getUserById(selectedId)
      .then(data => dispatch(addUserAction(data)));
  }, [selectedId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>Selected user:</span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        type="button"
        className="TodoList__user-button button"
        onClick={() => clearUser}
      >
        Clear
      </button>
    </div>
  );
};
