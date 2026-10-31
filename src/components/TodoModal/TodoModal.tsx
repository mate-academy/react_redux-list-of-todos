import React, { useEffect, useState } from 'react';

import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';
import type { User } from '../../types/User';

import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const todo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!todo) {
      return;
    }

    let cancelled = false;

    setUser(null);
    setIsLoading(true);
    setHasError(false);

    getUser(todo.userId)
      .then(data => {
        if (!cancelled) {
          setUser(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(clearCurrentTodo())}
          />
        </header>

        {!isLoading && (
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {hasError ? (
              <p className="notification is-danger">Unable to load user</p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
