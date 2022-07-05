import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { setUserActions } from '../../store/actions';

export const CurrentUser = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  return (
    <div className="CurrentUser">
      {user
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                { user.id }
              </span>
            </h2>
            <h3
              className="CurrentUser__name"
              data-cy="userName"
            >
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button"
              onClick={() => {
                dispatch(setUserActions(null));
              }}
            >
              Clear
            </button>
          </>

        )
        : 'User is not found'}

    </div>
  );
};
