import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/actions';
import { RootState } from '../../store/store';

import { User } from '../../types/User';

import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const currentUser: User | null = useSelector((state: RootState) => {
    const { reducer } = state;

    return reducer.currentUser;
  });

  const dispatch = useDispatch();

  const reset = useCallback(() => {
    dispatch(clearUser());
  }, []);

  return (
    <>
      {currentUser && (
        <div className="Current-user">
          <h2 className="CurrentUser__title">
            {`Selected user: ${currentUser.id}`}
          </h2>

          <h3 className="Current-user__name">
            {currentUser.name}
          </h3>

          <p className="Current-user__email">
            {currentUser.email}
          </p>

          <p className="Current-user__phone">
            {currentUser.phone}
          </p>

          <button
            type="button"
            onClick={reset}
            className="Current-user__clear button"
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
