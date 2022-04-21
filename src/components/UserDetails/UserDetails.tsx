/* eslint-disable no-console */
import {
  FC, memo, useState, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../data/users.api';
import { ACTIONS_CREATORS } from '../../store/actions/todos.actions';
import { getSelectedUserIdSelector } from '../../store/selectors';
import './UserDetails.scss';

type Props = {
  userId: number;
};

export const UserDetails: FC<Props> = memo(({
  userId,
}) => {
  const [user, setUser] = useState<User | null>(Object);

  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const dispatch = useDispatch();
  const { setSelectedUserId } = ACTIONS_CREATORS;

  useEffect(() => {
    getUser(userId).then(data => {
      setUser(data);
    });
  }, [userId]);

  console.log(selectedUserId);

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
            onClick={() => dispatch(setSelectedUserId(0))}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
});
