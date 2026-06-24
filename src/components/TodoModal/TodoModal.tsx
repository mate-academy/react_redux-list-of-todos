import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      setIsUserLoading(true);
      getUser(currentTodo?.userId)
        .then(userFromServer => {
          setCurrentUser(userFromServer);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Failed to load user:', error);
        })
        .finally(() => {
          setIsUserLoading(false);
        });
    }

    return;
  }, [currentTodo]);

  if (currentTodo) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(closeTodo())}
            />
          </header>

          <div className="modal-card-body">
            {isUserLoading ? (
              <Loader />
            ) : (
              <>
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {currentTodo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  <a href={`mailto:${currentUser?.email}`}>
                    {currentUser?.name}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};
