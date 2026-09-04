/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const todo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!todo) {
      setUser(null);

      return;
    }

    setIsLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo]);

  if (!todo) {
    return null;
  }

  const closeModal = () => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={closeModal}
      />

      {isLoading && <Loader />}

      {!isLoading && user && (
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
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
