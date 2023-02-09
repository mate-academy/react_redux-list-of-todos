import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector((state) => state.currentTodo);

  const handleTodoRemove = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId)
      .then(user => setCurrUser(user))
      .catch(() => setCurrUser(null))
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleTodoRemove}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  { 'has-text-danger': !currentTodo?.completed },
                  { 'has-text-success': currentTodo?.completed },
                )}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {currUser
                ? (
                  <a href={`mailto:${currUser.email}`}>
                    {currUser.name}
                  </a>
                ) : (
                  <span>
                    Anonymous
                  </span>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
