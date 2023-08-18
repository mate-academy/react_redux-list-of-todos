import React, { useState } from 'react';
import { Loader } from '../Loader';
import { actions as todoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const removeTodo = () => dispatch(todoActions.removeTodo());
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  getUser(currentTodo?.userId || 0)
    .then((currentUser) => setUser(currentUser));

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      { user ? (
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
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
