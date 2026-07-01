import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!todo?.userId) {
      setUser(null);

      return;
    }

    setLoading(true);
    setErrorMessage(null);

    getUser(todo.userId)
      .then(setUser)
      .catch(() => setErrorMessage('Failed to load user'))
      .finally(() => setLoading(false));
  }, [todo]);

  if (!todo) {
    return null;
  }

  if (errorMessage) {
    return <div style={{ color: 'red' }}>{errorMessage}</div>;
  }

  const { title, id, completed } = todo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" data-cy="todo" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{id}
          </div>

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
                {title}
              </p>
              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}
                <a href={`mailto: ${user?.email}`}>{user?.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
