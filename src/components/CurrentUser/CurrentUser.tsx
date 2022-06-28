import { useDispatch, useSelector } from 'react-redux';
import { removeUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  if (!user) {
    return <p>No selected user</p>;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <button
        type="button"
        onClick={() => {
          dispatch(removeUserAction());
        }}
      >
        Clear
      </button>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
