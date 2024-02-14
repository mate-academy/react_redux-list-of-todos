import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrent } from '../../features/currentTodo';
import { currentTodoSelector } from '../../features/selectors';

export const TodoModal: FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(currentTodoSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [user, setUser] = useState<User>();

  const { id, title, completed } = selectedTodo || {};
  const { email, name } = user || {};

  const closeTodo = () => {
    dispatch(actionsCurrent.removeTodo());
  };

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        if (selectedTodo) {
          const userFromServer = await getUser(selectedTodo.userId);

          setUser(userFromServer);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

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
              onClick={closeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            {!errorMessage ? (
              <p className="block" data-cy="modal-user">
                {completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${email}`}>{name}</a>
              </p>
            ) : (
              <p>{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
