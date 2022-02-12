import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/user';
import { changeUserId } from '../../store/actions';
import { getSelectedUserId } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
  const selectedUserId = useSelector(getSelectedUserId);

  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        if (selectedUserId === 0) {
          setUser(null);
        } else {
          const currentUser = await getUser(selectedUserId);

          setUser(currentUser);
        }

        setHasError(false);
      } catch {
        setUser(null);
        setHasError(true);
      }
    };

    getUserFromServer();
  },
  [selectedUserId]);

  if (hasError) {
    return (
      <div>User invalid</div>
    );
  }

  if (!user) {
    return (
      <div>No selected User</div>
    );
  }

  const clearUserDetails = () => {
    dispatch(changeUserId(0));
  };

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">
        {user.name}
      </h3>
      <p className="CurrentUser__email">
        {user.email}
      </p>
      <p className="CurrentUser__phone">
        {user.phone}
      </p>

      <button
        type="button"
        className="button"
        onClick={clearUserDetails}
      >
        Clear
      </button>
    </div>
  );
};
