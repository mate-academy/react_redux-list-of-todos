import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useOutsideClick } from '../hooks';

type Props = {
  currentTodo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ currentTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isShowTodoDetail = !isLoading && !hasError;

  const { id, userId, title, completed } = currentTodo;

  const statusMessage = completed ? 'Done' : 'Planned';

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const modalCardRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalCardRef, () => {
    onClose();
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && <Loader />}
      {hasError && (
        <div ref={modalCardRef} className="modal-card notification is-warning">
          Something went wrong!
        </div>
      )}

      {isShowTodoDetail && (
        <div className="modal-card" ref={modalCardRef}>
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
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {statusMessage}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
