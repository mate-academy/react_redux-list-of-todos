import { FC, memo, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type TodoModalProps = {
  selectedTodo: Todo;
  onClose: () => void;
};

const TodoModal: FC<TodoModalProps> = memo(({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id, title, completed, userId } = selectedTodo;

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [userId]);

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
              {`Todo #${id}`}
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
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                <span> by </span>

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

TodoModal.displayName = 'TodoModal';

export default TodoModal;
