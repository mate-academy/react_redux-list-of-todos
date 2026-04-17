import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../types/User';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!todo) return;

    setLoading(true);
    setUser(null);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [todo]);

  if (!todo) return null;

  return (
    <>
      <div
        className="modal is-active"
        data-cy="modal"
      >
        <div className="modal-background" />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title" data-cy="modal-title">
              {todo.title}
            </p>

            <button
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <section className="modal-card-body">
            {loading && <div data-cy="modal-loader">Loading user...</div>}

            {!loading && user && (
              <div data-cy="modal-user">
                <p data-cy="modal-user-name">{user.name}</p>
                <p data-cy="modal-user-email">{user.email}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};