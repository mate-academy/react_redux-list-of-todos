import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const todo = useSelector<RootState, Todo | null>(
    state => state.currentTodo.value,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (todo) {
      getUser(todo?.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todo?.userId]);

  if (!todo) {
    return null;
  }

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

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {todo.completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
