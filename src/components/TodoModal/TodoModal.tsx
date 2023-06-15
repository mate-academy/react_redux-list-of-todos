import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as TodoAction } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const handleModal = async () => {
    if (!currentTodo) {
      return;
    }

    setIsLoading(true);

    try {
      const getUserFromServer = await getUser(currentTodo.userId);

      setUser(getUserFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleModal();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (<Loader />)}

      {!isLoading && !isError && (
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
              aria-label="Close modal"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(TodoAction.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-success': currentTodo?.completed,
                'has-text-danger': !currentTodo?.completed,
              })}
              >
                {currentTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

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
