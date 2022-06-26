import './CurrentUser.scss';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUserSelector);

  if (!user) {
    return <span>No selected user!</span>;
  }

  return (
    <>
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`User: ${user.id}`}</span>
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
          onClick={() => {}}
          className="CurrentUser__clear"
        >
          Clear
        </button>
      </div>
    </>
  );
};
