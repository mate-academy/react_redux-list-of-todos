import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdFromServer } from '../api/api';
import { addUserAction, setUserIdAction } from '../store/actions';
import { userSelector, selectedUserIdSelector } from '../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = React.memo(() => {
  const user = useSelector(userSelector);
  const selectedUserId = useSelector(selectedUserIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserByIdFromServer(selectedUserId)
      .then(data => dispatch(addUserAction(data)));
  }, [selectedUserId]);

  return user && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={() => {
          dispatch(setUserIdAction(0));
        }}
      >
        Clear
      </button>
    </div>
  );
});
