import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoaging] = useState(true);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    const { userId } = currentTodo;

    getUser(userId)
      .then(setUser)
      .catch(() => setError('There is not user with this id'))
      .finally(() => setLoaging(false));
  }, [user, currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && !error ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <h2>{error}</h2>
      )}
    </div>
  );
};
