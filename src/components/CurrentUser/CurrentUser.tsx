import { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../store/actions';
import { RootState } from '../../store/store';
import { User } from '../../types/User';
import './CurrentUser.scss';

export const CurrentUser: FC = memo(() => {
  const currentUser: User | null = useSelector((state: RootState) => {
    const { reducer } = state;

    return reducer.currentUser;
  });

  const dispatch = useDispatch();

  const clear = useCallback(() => {
    dispatch(clearUser());
  }, []);

  return (
    <>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${currentUser.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">
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
            onClick={clear}
            className="CurrentUser__clear button"
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
});
