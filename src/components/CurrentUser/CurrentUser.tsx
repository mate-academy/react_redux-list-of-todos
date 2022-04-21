import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../api';
import { ACTIONS } from '../../store/actions';
import { getSelectedUserId, getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';
import './loader.css';

export const CurrentUser: React.FC = () => {
  const { addUser, setSelectedUserId } = ACTIONS;

  const selectedUser = useSelector(getUserSelector);
  const selectedUserId = useSelector(getSelectedUserId);
  const dispatch = useDispatch();

  const clearUser = () => dispatch(setSelectedUserId(0));

  useEffect(() => {
    getUserById(selectedUserId)
      .then(data => dispatch(addUser(data)));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {
        selectedUser ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {selectedUser?.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
            <p className="CurrentUser__email">{selectedUser?.email}</p>
            <p className="CurrentUser__phone">{selectedUser?.phone}</p>

            <button
              className="CurrentUser__clear TodoList__user-button--selected
              button"
              type="button"
              onClick={clearUser}
            >
              Clear
            </button>
          </>
        )
          : (
            <div className="lds-ripple">
              <div />
              <div />
            </div>
          )
      }
    </div>
  );
};
