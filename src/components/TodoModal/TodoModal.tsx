import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  const removeTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  const loadUsers = async () => {
    if (currentTodo) {
      const usersFromServer = await getUser(currentTodo.userId);

      setUser(usersFromServer);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              aria-label="delete"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setIsOpen(false);
                removeTodo();
              }}
            />

          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames(
                'has-text-success',
                {
                  'has-text-danger': !currentTodo?.completed,
                },
              )}
              >
                {
                  currentTodo?.completed
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
