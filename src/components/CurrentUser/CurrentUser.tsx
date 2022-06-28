import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUserSelector } from '../../store/selectors';
import { getUserById } from '../../api/api';
import { setUser } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const [unvisible, setUnvisible] = useState(false);
  const [currentError, setCurrentError] = useState('');

  useEffect(() => {
    const loadUserFromServer = async () => {
      try {
        const userFromServer = await getUserById(user?.id);

        dispatch(setUser(userFromServer));
      } catch (error) {
        setCurrentError('User is not exist');
      }
    };

    loadUserFromServer();
  }, [user?.id]);

  if (!user) {
    return <span>{currentError}</span>;
  }

  return (
    <>
      <div
        className="CurrentUser"
        style={{ display: unvisible ? 'none' : 'block' }}
      >
        <h2 className="CurrentUser__title">
          <span>{`User: ${user?.id}`}</span>
        </h2>
        <h3
          className="CurrentUser__name"
          data-cy="userName"
        >
          {user?.name}
        </h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
      </div>
      <button
        type="button"
        className="CurrentUser__clear CurrentUser__button"
        onClick={() => {
          setUnvisible(!unvisible);
        }}
      >
        {unvisible ? 'Show' : 'Clear'}
      </button>
    </>
  );
};
