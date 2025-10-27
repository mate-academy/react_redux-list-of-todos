import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setLoading(true);

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, [currentTodo]);

  if (!currentTodo) {
    return;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && (
        <div className="modal-card">
          <div className="modal-card-body">
            <Loader />
          </div>
        </div>
      )}

      {!loading && !errorMessage && user && (
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
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            {user && !loading && (
              <p className="block" data-cy="modal-user">
                {currentTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}

      {!loading && errorMessage && (
        <div className="modal-card">
          <div className="modal-card-body">
            <div className="notification is-danger" data-cy="error">
              {errorMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
