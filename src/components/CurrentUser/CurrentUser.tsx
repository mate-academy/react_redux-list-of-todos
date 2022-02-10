import { useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser = () => {
  const user = useSelector(getUserSelector);

  if (!user) {
    return (
      <div>No user</div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
