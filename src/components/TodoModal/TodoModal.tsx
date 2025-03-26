import React, { useLayoutEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const { removeCurrentTodo } = currentTodoSlice.actions;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error && <p>{error}</p>}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(removeCurrentTodo())}
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

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
