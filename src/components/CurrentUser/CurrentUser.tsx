import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../api/api';
import { selectUserIdAction, userAction } from '../../store/actions';
import { selectedUserIdSelector, userSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = memo(() => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const selectedUserId = useSelector(selectedUserIdSelector);

  useEffect(() => {
    fetchUserById(selectedUserId)
      .then(person => dispatch(userAction(person)));
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
        onClick={() => dispatch(selectUserIdAction(0))}
      >
        Clear
      </button>
    </div>
  );
});
