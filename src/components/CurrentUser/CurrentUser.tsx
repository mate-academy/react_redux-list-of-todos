import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getStatusOfUserError, getUserSelector } from '../../store/selectors';
import { loadUserAction } from '../../store/actions';

export const CurrentUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const isUserHasError = useSelector(getStatusOfUserError);

  if (isUserHasError) {
    return (
      <p>No user was founded</p>
    );
  }

  if (!user) {
    return (
      <p>No user selected</p>
    );
  }

  const clearUser = () => {
    dispatch(loadUserAction(null));
  };

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>
      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        type="button"
        className="CurrentUser__clear button"
        onClick={clearUser}
      >
        Clear
      </button>
    </div>
  );
};
