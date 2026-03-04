import { Loader } from '../Loader';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';

interface Props {
  todoId: number;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todoId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const todo = useAppSelector(state => state.todos.find(t => t.id === todoId));

  useEffect(() => {
    if (todo) {
      setLoading(true);
      getUser(todo.userId)
        .then(userData => setUser(userData))
        .finally(() => setLoading(false));
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

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
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            <strong
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.completed ? 'Done' : 'Planned'}
            </strong>
            {user && (
              <>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
