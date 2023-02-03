import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (selectedTodo?.userId) {
      setIsLoading(true);

      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleTodoRemoving = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        isLoading && <Loader />
      }

      {
        !isLoading && selectedTodo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleTodoRemoving}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              {
                user && (
                  <p className="block" data-cy="modal-user">
                    {
                      selectedTodo.completed
                        ? <strong className="has-text-success">Done</strong>
                        : <strong className="has-text-danger">Planned</strong>
                    }

                    {' by '}
                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  </p>
                )
              }

              {
                !user && isError && (
                  <p className="block" data-cy="modal-user">
                    {
                      selectedTodo.completed
                        ? <strong className="has-text-success">Done</strong>
                        : <strong className="has-text-danger">Planned</strong>
                    }

                    <p style={{ color: 'red' }}>
                      can not load user
                    </p>
                  </p>
                )
              }

            </div>
          </div>
        )
      }
    </div>
  );
};
