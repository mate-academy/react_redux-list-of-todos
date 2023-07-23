import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (currentTodo) {
          const loadedUsers = await getUser(currentTodo?.userId);

          setUser(loadedUsers);
        }
      } catch (error) {
        if (error) {
          setIsError(true);
        }

        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [currentTodo]);

  const { id, title, completed } = currentTodo || {};
  const { email, name } = user || {};

  const handleCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

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
              Todo #
              {id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="delete"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              {isError
                ? (
                  <p className="notification is-warning">
                    User can not be loaded.
                  </p>
                ) : (
                  <a href={`mailto:${email}`}>{name}</a>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
