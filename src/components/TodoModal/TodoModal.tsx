import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const removeTodo = () => dispatch(currTodoActions.removeTodo());

  const {
    id,
    title,
    completed,
    userId,
  } = currentTodo!;

  const fetchUser = async () => {
    try {
      const foundUser = await getUser(userId);

      setUser(foundUser);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className={classnames('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {hasError
                ? (
                  'Error'
                )
                : `Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block"
              data-cy="modal-title"
            >
              {hasError
                ? (
                  <p className="notification is-warning">
                    Failed to load user from server
                  </p>
                )
                : title}

            </p>

            {!hasError && (
              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
