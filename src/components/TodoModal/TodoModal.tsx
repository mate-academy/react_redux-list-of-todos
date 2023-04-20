import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodosActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasReceivedUser, setHasReceivedUser] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (todo) {
          const fetchedUser = await getUser(todo.userId);

          setUser(fetchedUser);
          setHasReceivedUser(true);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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
                {`Todo #${todo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(currentTodosActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              {hasError && (
                <strong className="has-text-success">
                  Unable to load the user
                </strong>
              )}

              {hasReceivedUser && (
                <>
                  <p className="block" data-cy="modal-title">{todo?.title}</p>

                  <p className="block" data-cy="modal-user">
                    {todo?.completed
                      ? (<strong className="has-text-success">Done</strong>)
                      : (<strong className="has-text-danger">Planned</strong>)}

                    {' by '}

                    <a href={`mailto:${user?.email}`}>
                      {user?.name}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
    </div>
  );
};
