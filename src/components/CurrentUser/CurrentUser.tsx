import React from 'react';

import './CurrentUser.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeUserId } from '../../features/user/userSlice';

export const CurrentUser: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    user,
    isUserLoading,
    userLoadingError,
  } = useAppSelector(store => store.user);

  const handleClearButton = () => {
    dispatch(changeUserId(null));
  };

  return (
    <>
      {(!userLoadingError && !isUserLoading) && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            className="button"
            type="button"
            onClick={handleClearButton}
          >
            Clear
          </button>
        </div>
      )}

      <div>
        {(userLoadingError && !isUserLoading) && (
          <div>
            Unable to load the data
          </div>

        )}

        {isUserLoading && (
          <div>
            Loading...
          </div>
        )}
      </div>
    </>
  );
};
