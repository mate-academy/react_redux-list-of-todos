import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import './CurrentUser.scss';
import { RootState, getSelectedUserId } from '../../store';
import { clearUser } from '../../store/selectedUser';
import { getCurrentUser } from '../../api/api';

const mapState = (state: RootState) => {
  return {
    currentUserId: getSelectedUserId(state),
  };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const CurrentUser: React.FC<Props> = ({ currentUserId }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser(currentUserId).then(user => setCurrentUser(user));
  }, [currentUserId]);

  return currentUser && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{currentUser.id ? `Selected user: ${currentUser.id}` : 'Could not find user'}</span></h2>

      <h3 className="CurrentUser__name">{currentUser.name ? currentUser.name : 'No information about this user'}</h3>
      <p className="CurrentUser__email">{currentUser.email}</p>
      <p className="CurrentUser__phone">{currentUser.phone}</p>
      <button
        className="CurrentUser__clear"
        type="button"
        onClick={() => dispatch(clearUser())}
      >
        Clear
      </button>
    </div>
  );
};

export default connector(CurrentUser);
