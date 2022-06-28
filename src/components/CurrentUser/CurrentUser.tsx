import React, { useEffect } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../store/actions';
import { getUser } from '../../api/users';
import { getUserSelector } from '../../store/selectors';

type Props = {
  userId: number;
  deleteUser: () => void;
};

export const CurrentUser: React.FC<Props> = React.memo(({
  userId,
  deleteUser,
}) => {
  const selectedUser = useSelector(getUserSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(userId)
      .then(user => dispatch(setUserAction(user)));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedUser?.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name" data-cy="userName">
        {selectedUser?.name}
      </h3>
      <p className="CurrentUser__email">{selectedUser?.email}</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        type="button"
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
          CurrentUser__button
        "
        onClick={deleteUser}
      >
        Close
      </button>
    </div>
  );
});
