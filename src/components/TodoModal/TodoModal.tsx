import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetCurrentTodo, selectCurrentTodo } from '../../features';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todoUser, setTodoUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const activeTodo = useAppSelector(selectCurrentTodo);

  useEffect(() => {
    if (activeTodo) {
      setIsLoading(true);
      getUser(activeTodo.userId)
        .then(setTodoUser)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setTodoUser(null);
    }
  }, [activeTodo]);

  if (!activeTodo) {
    return null;
  }

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
              {`Todo #${activeTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(resetCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {todoUser && (
                <a href={`mailto:${todoUser.email}`}>{todoUser.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
