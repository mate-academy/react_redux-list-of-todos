import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.currentTodo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setLoading(true);
    setError(null);

    getUser(todo.userId)
      .then(setUser)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [todo]);

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
              {`Todo #${todo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {error ? (
                <span className="has-text-danger">Error loading user</span>
              ) : (
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
