import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const closeTodo = () => {
    dispatch(currentTodoSlice.actions.clearTodo());
  };

  useEffect(() => {
    setIsLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(fetchedUser => {
          setUser(fetchedUser);
        })
        .catch(() => {
          setError('Failed to load user');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedTodo]);

  if (isLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <Loader />
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <button type="button" className="delete" data-cy="modal-close"
            onClick={closeTodo}/>
          </header>

          <div className="modal-card-body">
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user && (
                <a href={`mailto:${user.email}`} className="has-text-link">
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
