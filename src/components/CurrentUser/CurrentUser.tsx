import React, {
  Dispatch, memo, SetStateAction,
  useEffect, useState,
} from 'react';

import './CurrentUser.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../API/api';
import { LoadingError } from '../LoadingError';
import { actions, getHasLoadingError } from '../../store';
import { User } from '../../types/User';

interface Props {
  selectedUserId: number,
  setSelectedUserId: Dispatch<SetStateAction<number>>,
}

export const CurrentUser: React.FC<Props> = memo(({
  selectedUserId,
  setSelectedUserId,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const hasLoadingError = useSelector(getHasLoadingError);

  useEffect(() => {
    dispatch(actions.setHasLoadingError(false));
    setUser(null);
    getUserById(selectedUserId)
      .then(loadedUser => setUser(loadedUser))
      .catch(() => dispatch(actions.setHasLoadingError(true)));
  }, [selectedUserId, setSelectedUserId]);

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {!user ? (
        hasLoadingError
          ? <LoadingError />
          : 'User is loading'
      ) : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user?.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>

          <p className="CurrentUser__email">{user?.email}</p>

          <p className="CurrentUser__phone">{user?.phone}</p>

          <button
            className="
          CurrentUser__clear
          button
        "
            type="button"
            onClick={() => setSelectedUserId(0)}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
});
