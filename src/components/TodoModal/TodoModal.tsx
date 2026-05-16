import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { Loader } from '../Loader';
import {
  clearCurrentTodo,
  setCurrentTodoLoading,
  setUser,
} from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo.item);
  const user = useAppSelector(state => state.currentTodo.user);
  const isLoading = useAppSelector(state => state.currentTodo.isLoading);

  useEffect(() => {
    if (currentTodo) {
      dispatch(setCurrentTodoLoading(true));

      getUser(currentTodo.userId)
        .then(fetchedUser => {
          dispatch(setUser(fetchedUser));
        })
        .catch(() => {})
        .finally(() => {
          dispatch(setCurrentTodoLoading(false));
        });
    }
  }, [currentTodo?.id, dispatch]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(clearCurrentTodo())}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={() => dispatch(clearCurrentTodo())}
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
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
