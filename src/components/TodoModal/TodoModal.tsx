import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Error } from '../Error';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const removeTodo = () => dispatch(currentTodoActions.removeTodo());

  const clearError = () => {
    setTimeout(() => {
      setErrorMessage('');
      removeTodo();
    }, 3000);
  };

  const loadUser = async () => {
    try {
      setIsLoading(true);
      if (selectedTodo) {
        const userFromServer = await getUser(selectedTodo.userId);

        setUser(userFromServer);
      }
    } catch (error) {
      setErrorMessage('Unable to load user');

      clearError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {isLoading && (
          <Loader />
        )}
        {user && selectedTodo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {selectedTodo && `Todo #${selectedTodo.id}`}
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
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}
                <a href={`mailto:${user.email}`}>
                  <span>{user.name}</span>
                </a>
              </p>
            </div>
          </div>
        )}
        {!isLoading && errorMessage && (
          <Error errorMessage={errorMessage} />
        )}
      </div>
    </>
  );
};
