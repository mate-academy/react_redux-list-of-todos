import {
  FC, memo, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserById } from '../../data/users.api';
import { ACTIONS_CREATORS } from '../../store/actions/todos.actions';
import { addUserAction } from '../../store/actions/users.actions';
import {
  getSelectedUserIdSelector,
  loadUserSelector,
} from '../../store/selectors';
import './UserDetails.scss';

export const UserDetails: FC = memo(() => {
  const user = useSelector(loadUserSelector);
  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const dispatch = useDispatch();
  const { setSelectedUserById } = ACTIONS_CREATORS;

  useEffect(() => {
    getUserById(selectedUserId)
      .then(person => dispatch(addUserAction(person)));
  }, [selectedUserId]);

  return (
    <div key={user?.id}>
      {user && (
        <>
          <h2 className="UserDetails__title">
            <span>
              Selected user:
              {' '}
              {user?.id}
            </span>
          </h2>

          <h3 className="UserDetails__name">{user?.name}</h3>
          <p className="UserDetails__email">{user?.email}</p>
          <p className="UserDetails__phone">{user?.phone}</p>

          <button
            type="button"
            className="UserDetails__user-button button"
            onClick={() => dispatch(setSelectedUserById(0))}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
});
