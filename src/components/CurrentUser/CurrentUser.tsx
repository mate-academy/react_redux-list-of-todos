import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../api';
import { setSelectedId, setUser } from '../../store/actions';
import { getSelectedId, getUser } from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const selectedId = useSelector(getSelectedId);

  useEffect(() => {
    getUsers(selectedId)
      .then((res) => dispatch(setUser(res)))
      .catch(() => dispatch(setUser(null)));
  }, [selectedId]);

  return (
    user ? (
      <div className="CurrentUser">
        <div className="container">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${selectedId}`}</span>
          </h2>
          <button
            type="button"
            className="CurrentUser__clear"
            onClick={() => dispatch(setSelectedId(0))}
          >
            X
          </button>
        </div>

        <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    ) : <div>No user details</div>
  );
};
