import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const removeTodo = () => dispatch(currentTodoActions.removeTodo());

  const getUserFromServer = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const userFromServer = await getUser(currentTodo?.userId || 0);

      setCurrentUser(userFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentTodo) {
      getUserFromServer();
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close-button"
                onClick={removeTodo}
              />
            </header>

            <div className="modal-card-body">
              {isError
                ? (
                  <strong className="has-text-danger">
                    Can&apos;t load user
                  </strong>
                )
                : (
                  <>
                    <p className="block" data-cy="modal-title">
                      {currentTodo?.title}
                    </p>

                    <p className="block" data-cy="modal-user">
                      {currentTodo?.completed
                        ? <strong className="has-text-success">Done</strong>
                        : <strong className="has-text-danger">Planned</strong>}
                      {' by '}
                      <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
                    </p>
                  </>
                )}
            </div>
          </div>
        )}
    </div>
  );
};
