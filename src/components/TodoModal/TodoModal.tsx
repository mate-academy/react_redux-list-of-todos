import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { setCurrentTodos } from '../../features/currentTodo';
import classNames from 'classnames';
import { setUser } from '../../features/todos';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const todo = useAppSelector(state => state.todos.items);
  const current = useAppSelector(state => state.current.selectedTodo);
  const user = useAppSelector(state => state.todos.user);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setCurrentTodos(null));
    dispatch(setUser(null));
  };

  useEffect(() => {
    if (current) {
      setIsLoading(true);
      getUser(current.userId)
        .then(userData => {
          dispatch(setUser(userData));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [current, dispatch]);

  if (!current) {
    return null;
  }

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
              Todo #{current.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {current.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  current.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {current.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
