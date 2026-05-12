import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

interface Props {
  todoId: number;
  onClose: () => void;
}

export const TodoModal: React.FC<Props> = ({ todoId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const todo = useAppSelector(state =>
    state.todos.find(tod => tod.id === todoId),
  );

  useEffect(() => {
    if (todo) {
      setLoading(true);
      getUser(todo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

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
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {loading ? (
            <Loader />
          ) : (
            <>
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
                {' by '}
                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
