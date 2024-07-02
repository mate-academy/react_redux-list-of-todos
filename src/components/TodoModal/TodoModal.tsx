import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const { title, completed, userId, id } = useAppSelector(
    state => state.currentTodo,
  );
  const closeTodo = () => dispatch(currentTodoSlice.actions.clearTodo(null));

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then(setUser)
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
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
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
