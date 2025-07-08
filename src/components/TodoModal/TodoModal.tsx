import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearTodo, loadCurrentTodoWithUser } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: RootState) => state.currentTodo.todo);
  const user = useSelector((state: RootState) => state.currentTodo.user);
  const loading = useSelector((state: RootState) => state.currentTodo.loading);

  useEffect(() => {
    if (todo) {
      dispatch(loadCurrentTodoWithUser(todo));
    }
  }, [dispatch, todo]);

  if (!todo) {
    return null;
  }

  const handleTodoClose = () => {
    dispatch(clearTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todo.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => handleTodoClose()}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {todo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
          </p>
        </div>
      </div>
    </div>
  );
};
