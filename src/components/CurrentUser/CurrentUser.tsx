import React, { useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { fetchUser } from '../../api/api';
import {
  getCurrentUser,
  getCurrentUserError,
  getCurrentUserId,
} from '../../store';
import './CurrentUser.scss';

const mapDispatchToProps = {
  getUserFromServer: fetchUser,
};

const connector = connect(
  null,
  mapDispatchToProps,
);

type PropsUser = ConnectedProps<typeof connector>;

const CurrentUser: React.FC<PropsUser> = ({
  getUserFromServer,
}) => {
  const userId = useSelector(getCurrentUserId);
  const error = useSelector(getCurrentUserError);
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    if (userId) {
      getUserFromServer(userId);
    }
  }, [userId, getUserFromServer]);

  return (
    (error)
      ? (
        <p>{error.toString()}</p>
      ) : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${userId}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
        </div>
      )
  );
};

export default connector(CurrentUser);
