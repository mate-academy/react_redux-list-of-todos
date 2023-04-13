import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { actions as todoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadUser = async (currentTodo: Todo | null) => {
    try {
      if (currentTodo) {
        const userFromServer = await getUser(currentTodo.userId);

        setUser(userFromServer);
        setIsLoadingError(false);
      }
    } catch {
      setIsLoadingError(true);
    }
  };

  useEffect(() => {
    loadUser(selectedTodo);
  }, []);

  const isLoadingFinished = (isLoadingError && user === null) || user;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id, title, completed } = selectedTodo!;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoadingFinished && <Loader />}

      {isLoadingFinished && (
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
              onClick={() => dispatch(todoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {isLoadingError && (
                <p className="has-text-danger">Some loading error</p>
              )}

              {!isLoadingError && (
                <>
                  {completed && (
                    <strong className="has-text-success">Done</strong>
                  )}
                  {!completed && (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {' by '}

                  {user && <a href="mailto:Sincere@april.biz">{user.name}</a>}
                  {!user && (
                    <span className="has-text-danger">User not found</span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
