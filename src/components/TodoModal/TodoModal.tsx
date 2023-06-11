import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  currentTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  const {
    id,
    title,
    completed,
    userId,
  } = currentTodo;

  const handleTodoSelect = async () => {
    try {
      const res = await getUser(userId);

      setUser(res);
      setError('');
    } catch {
      setError('unable to get user');
    }
  };

  useEffect(() => {
    onTodoSelect();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && !error && (<Loader />)}

      {error && (
        <p className="notification is-warning">
          {error}
        </p>
      )}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch({ type: 'currentTodo/REMOVE' })}
              aria-label="button"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              {completed 
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>
              }
              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
