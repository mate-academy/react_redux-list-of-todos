import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const userFromServer = await getUser(todo?.userId || 0);

        setSelectedUser(userFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        {isError && !isLoading && !selectedUser && (
          <p>Cannot find user! Try again!</p>
        )}

        {selectedUser && (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close-user"
                onClick={() => dispatch(currentTodoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo?.title}</p>

              <p className="block" data-cy="modal-user">
                {!todo?.completed ? (
                  <strong className="has-text-danger">
                    Planned
                  </strong>

                ) : (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )}
                {' by '}
                <a href={`mailto:${selectedUser.email}`}>
                  {selectedUser.name}
                </a>
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
