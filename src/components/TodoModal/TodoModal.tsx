import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrent } from '../../features/currentTodo';

const errorText = 'User not found';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (selectedTodo) {
          const responce = await getUser(selectedTodo.userId);

          setUser(responce);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }

        setIsLoading(false);
      }
    };

    fetchUser();
  }, [selectedTodo]);

  const { id, title, completed } = selectedTodo || {};
  const { email, name } = user || {};

  const closeTodo = () => {
    dispatch(actionsCurrent.removeTodo());
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
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodo}
              aria-label="delete"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>
            {errorMessage === errorText
              ? <p>{errorMessage}</p>
              : (
                <span>
                  <p className="block" data-cy="modal-user">
                    {completed
                      ? <strong className="has-text-success">Done </strong>
                      : <strong className="has-text-danger">Planned </strong>}

                    <a href={`mailto:${email}`}>
                      {`by ${name}`}
                    </a>
                  </p>
                </span>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
