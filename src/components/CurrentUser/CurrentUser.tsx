import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { actions as currentTodoActions } from '../../store/currentTodo';
import { getSelectedUser } from '../../api/api';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUser
    = useAppSelector(state => state.currentTodo.selectedUser);
  const userInfo = useAppSelector(state => state.currentTodo.userInfo);

  useEffect(() => {
    if (selectedUser) {
      getSelectedUser(selectedUser)
        .then(result => dispatch(currentTodoActions.getUserInfo(result)));
    }
  }, [selectedUser]);

  const clearUser = () => {
    dispatch(currentTodoActions.selectUser(0));
  };

  return (
    <>
      {userInfo
        ? (
          <>
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${selectedUser}`}</span>
              </h2>

              <h3
                className="CurrentUser__name"
                data-cy="userName"
              >
                {userInfo?.name}
              </h3>
              <p className="CurrentUser__email">{userInfo?.email}</p>
              <p className="CurrentUser__phone">{userInfo?.phone}</p>
            </div>

            <button
              type="button"
              onClick={() => clearUser()}
              className="CurrentUser__clear button"
            >
              Clear
            </button>
          </>
        )
        : <h3>No user data</h3>}
    </>
  );
};
