import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

interface TodoModalProps {
  todo: Todo;
}

export const TodoModal: React.FC<TodoModalProps> = todo => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleTodoClose = () => {
    dispatch(currentTodoSlice.actions.toggleTodo(todo.todo));
  };

  useEffect(() => {
    getUser(todo.todo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [todo.todo.userId]);

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
              Todo #{todo.todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleTodoClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.todo.completed ? (
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
