import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo, loading } = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      dispatch(currentTodoSlice.actions.setLoading(true));
      getUser(currentTodo.userId)
        .then(selectedUser => setUser(selectedUser))
        .catch(error => {
          throw error;
        })
        .finally(() => dispatch(currentTodoSlice.actions.setLoading(false)));
    }
  }, [currentTodo, dispatch]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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
              onClick={() =>
                dispatch(currentTodoSlice.actions.setCurrentTodo(null))
              }
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
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
