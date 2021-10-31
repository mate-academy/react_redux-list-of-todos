import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { clearUser } from '../../store/reducers/SelectedUserSlice';
import { getUserById } from '../../store/reducers/UserSlice';

import './CurrentUser.scss';

type CurrentUserProps = {};

export const CurrentUser: FC<CurrentUserProps> = () => {
  const { user, error, isLoading } = useAppSelector(state => state.user);
  const { selectedUserId } = useAppSelector(state => state.selectedUserId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getUserById(selectedUserId));
    }
  }, [selectedUserId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="CurrentUser">
      {
        user ? (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              className="CurrentUser__clear button"
              onClick={() => dispatch(clearUser())}
              type="button"
            >
              Clear selected user
            </button>
          </>
        ) : (
          <h2 className="CurrentUser__title">
            <span>Select user</span>
          </h2>
        )
      }
    </div>
  );
};
