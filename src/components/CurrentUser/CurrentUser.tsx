import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchUser } from '../../api/api';
import { RooTStateT } from '../../api/interface';
import {
  getCurrentUser,
  getCurrentUserError,
  getCurrentUserPending,
  getTodosListUserId,
} from '../../store';
import './CurrentUser.scss';

const mapStateToProps = (state: RooTStateT) => ({
  userId: getTodosListUserId(state),
  pending: getCurrentUserPending(state),
  error: getCurrentUserError(state),
  user: getCurrentUser(state),
});

const mapDispatchToProps = {
  getUserFromServer: fetchUser,
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

type PropsUser = ConnectedProps<typeof connector>;

const CurrentUser: React.FC<PropsUser> = ({
  userId,
  error,
  user,
  getUserFromServer,
}) => {
  useEffect(() => {
    if (userId !== 0) {
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
