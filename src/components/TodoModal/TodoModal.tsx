import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (todo) {
      setIsLoading(true);
      getUser(todo.userId)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div
          className="modal-background"
          onClick={() => dispatch(setCurrentTodo(null))}
        />
        <Loader />
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setCurrentTodo(null))}
      />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(setCurrentTodo(null))}
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
            {user ? (
              <a href={`mailto:${user.email}`}>{user.name}</a>
            ) : (
              'loading user...'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
