import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { LoadingStatus } from '../../types/LoadingStatus';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo.todo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');

  const handleCloseClick = () => {
    dispatch(currentTodoSlice.actions.closeTodo());
  };

  const handleUserLoad = useCallback(async () => {
    if (todo) {
      try {
        setUser(await getUser(todo?.userId));
        setLoadingStatus('success');
      } catch {
        setLoadingStatus('error');
      }
    }
  }, [todo]);

  useEffect(() => {
    handleUserLoad();
  }, [handleUserLoad]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingStatus === 'loading' ? (
        <Loader />
      ) : loadingStatus === 'success' ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="modal-card-head">
          <p className="modal-card-title has-text-danger">
            Something went wrong!
          </p>
        </div>
      )}
    </div>
  );
};
