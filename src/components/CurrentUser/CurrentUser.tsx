import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const {
    hasError,
    user,
    userId,
    isLoading,
  } = useTypedSelector(state => state.user);

  const { loadUser, setUserId } = useActions();

  useEffect(() => {
    loadUser(userId);
  }, [userId]);

  if (isLoading) {
    return <h1>Loading users...</h1>;
  }

  return (
    <div className="CurrentUser">
      {hasError ? (
        <div>User not found :(</div>
      ) : (
        <>
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>
          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            onClick={() => setUserId(0)}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
};
