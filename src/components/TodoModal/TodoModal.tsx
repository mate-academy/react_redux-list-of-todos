import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  updateErrorMessage: (error: string) => void;
};

export const TodoModal: React.FC<Props> = ({ updateErrorMessage }) => {
  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector<RootState>(state => state);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteCurrent = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateErrorMessage('Request timed out');
      setIsLoading(false);
    }, 3000);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(userData => {
          setUser(userData);
        })
        .catch(error => {
          updateErrorMessage(`Error fetching user data. ${error}`);
        })
        .finally(() => {
          clearTimeout(timeoutId);
          setIsLoading(false);
        });
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {user && (
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
              aria-label="modal-close"
              onClick={handleDeleteCurrent}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !currentTodo?.completed,
                  'has-text-success': currentTodo?.completed,
                })}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
