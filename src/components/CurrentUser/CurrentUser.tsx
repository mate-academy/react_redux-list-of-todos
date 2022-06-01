import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromServer } from '../../api/api';
import {
  loadUserAction,
  setLoadingErrorAction,
  setSelectedIDAction,
} from '../../store/TodosReducer/actions';
import {
  getIsLoadingErrorSelector,
  getSelectedIDSelector,
  getUserSelector,
} from '../../store/TodosReducer/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const userId = useSelector(getSelectedIDSelector);
  const currentUser = useSelector(getUserSelector);
  const isLoadingError = useSelector(getIsLoadingErrorSelector);

  const getUser = useCallback(async () => {
    try {
      const newUser = await getUserFromServer(userId);

      dispatch(setLoadingErrorAction(false));
      dispatch(loadUserAction(newUser));
    } catch {
      dispatch(loadUserAction(null));
      dispatch(setLoadingErrorAction(true));
    }
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <>
      {currentUser && (
        <div className="CurrentUser" data-cy="userName">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {currentUser.name}
          </h3>

          <p className="CurrentUser__email">
            {currentUser.email}
          </p>

          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>

          <button
            type="button"
            className="CurrentUser__clear"
            onClick={() => dispatch(setSelectedIDAction(0))}
          >
            Clear
          </button>
        </div>
      )}

      {isLoadingError && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Loading Error
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            No user data
          </h3>
        </div>
      )}
    </>
  );
});
