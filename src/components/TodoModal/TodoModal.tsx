import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { ERROR_MESSAGE } from '../../helpers/variables';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedTodo } = useAppSelector((state) => state.todo);
  const dispatchTodo = useAppDispatch();

  const {
    userId,
    id,
    title,
    completed,
  } = selectedTodo;

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then((user) => setSelectedUser(user))
      // eslint-disable-next-line no-console
      .catch(() => console.error(ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

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
              onClick={() => dispatchTodo(actionsCurrTodo.resetTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
