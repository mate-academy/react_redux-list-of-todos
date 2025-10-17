import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

type Props = {
  onClose: () => void;
};

export const ModalCard: React.FC<Props> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!currentTodo?.userId) {
      setUser(null);
      setLoading(false);

      return;
    }

    setLoading(true);
    setError('');
    getUser(currentTodo.userId)
      .then(setUser)
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, [currentTodo?.userId]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>
          <div className="modal-card-body">
            {!loading && error && (
              <div className="notification is-danger">{error}</div>
            )}
            {!loading && !error && !user && (
              <p className="title is-5">There is no user</p>
            )}
            {!loading && !error && user && (
              <>
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>
                <p className="block" data-cy="modal-user">
                  <strong
                    className={classNames({
                      'has-text-success': currentTodo.completed,
                      'has-text-danger': !currentTodo.completed,
                    })}
                  >
                    {currentTodo.completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
