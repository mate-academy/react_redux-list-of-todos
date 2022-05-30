import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromServer } from '../../api';
import { addUserAction, selectUserIdAction } from '../../store/actions';
import { getUserSelector, selectedUserIdSelector } from '../../store/selector';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const selectedUser = useSelector(getUserSelector);
  const selectedUserId = useSelector(selectedUserIdSelector);
  const dispatch = useDispatch();

  const clearUser = () => dispatch(selectUserIdAction(0));

  useEffect(() => {
    getUserFromServer(selectedUserId)
      .then(data => dispatch(addUserAction(data)));
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
              className="CurrentUser__clear
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
