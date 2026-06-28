import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setIsLoading(true);

    getUser(currentTodo.userId)
      .then(receivedUser => setUser(receivedUser))
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoSlice.actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo && !currentTodo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo && currentTodo.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
