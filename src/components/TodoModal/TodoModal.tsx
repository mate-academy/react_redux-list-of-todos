import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

type Props = {
  selectedTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo }) => {
  const [hasError, sethasError] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const { id, title, completed } = selectedTodo;
  const { name, email } = currentUser || {};

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(user => setCurrentUser(user))
        .catch(() => sethasError(true));
    }
  }, [selectedTodo]);

  const onButtonClick = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {hasError && (
        <p className="notification is-warning">
          Oops... Something went wrong.
        </p>
      )}

      {!currentUser ? (
        <Loader />
      ) : (
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
              aria-label="modal-close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onButtonClick}
            />
          </header>

          <div className="modal-card-body">
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
              <a
                href={`mailto:${email}`}
              >
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
