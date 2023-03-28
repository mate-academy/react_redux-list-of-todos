/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      if (currentTodo) {
        const userFromServer = await getUser(currentTodo.userId);

        setUser(userFromServer);
      }
    } catch (error) {
      Promise.reject();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  function handleRemoveTodo() {
    dispatch(todoActions.removeTodo());
  }

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />
      {isLoading
        ? (
          <Loader />
        )
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
                onClick={handleRemoveTodo}
              />
            </header>

            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {currentTodo?.title}
              </p>

              <p
                className="block"
                data-cy="modal-user"
              >
                {!currentTodo?.completed && (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

                {currentTodo?.completed && (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )}

                {' by '}

                <a href={`mailto:${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
