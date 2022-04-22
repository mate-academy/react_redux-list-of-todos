import {
  FC, memo, useState, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';

import { getUser } from '../../data/users.api';
import { ACTIONS_CREATORS } from '../../store/actions/todos.actions';
import { User } from '../../types/user.type';
import './UserDetails.scss';

type Props = {
  userId: number;
};

export const UserDetails: FC<Props> = memo(({
  userId,
}) => {
  const [user, setUser] = useState<User | null>(Object);

  const dispatch = useDispatch();

  const { setSelectedUserId } = ACTIONS_CREATORS;

  useEffect(() => {
    getUser(userId).then(data => {
      setUser(data);
    });
  }, [userId]);

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
