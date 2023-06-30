import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';
import { ErrorTypes } from '../../types/ErrorTypes';
import { Notification } from '../Notification';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes>(ErrorTypes.None);

  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchUser = () => {
      setIsLoading(true);
      if (selectedTodo) {
        getUser(selectedTodo.userId)
          .then(data => {
            setUser(data);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
            setIsError(true);
            setErrorMessage(ErrorTypes.LoadUser);
          });
      }
    };

    fetchUser();
  }, [selectedTodo]);

  const { id, title, completed } = selectedTodo || {};
  const { email, name } = user || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (
          <Loader />)
        : (
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
                onClick={() => dispatch(actions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>
              {isError
                ? <Notification errorMessage={errorMessage} />
                : (
                  <p className="block" data-cy="modal-user">
                    {completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>}
                    { ' by ' }
                    <a href={`mailto:${email}`}>
                      {name}
                    </a>
                  </p>
                )}
            </div>
          </div>
        )}
    </div>
  );
};
