import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  const handleCloseTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

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
            aria-label="closeButton"
            onClick={handleCloseTodo}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

          <p className="block" data-cy="modal-user">
            {currentTodo?.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
