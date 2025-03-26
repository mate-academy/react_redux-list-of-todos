import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo as Todo);

  const handleClear = () => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));
    setActiveUser(null);
  };

  useEffect(() => {
    getUser(currentTodo.userId)
      .then(setActiveUser)
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

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
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClear}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${activeUser?.email}`}>{activeUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
