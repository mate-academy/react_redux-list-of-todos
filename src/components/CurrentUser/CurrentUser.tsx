import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 50 }}>
        No selected user
      </div>
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
      <button
        className="button CurrentUser__clear"
        type="button"
        onClick={() => dispatch(loadUserAction(null))}
      >
        Clear
      </button>
    </div>
  );
};
