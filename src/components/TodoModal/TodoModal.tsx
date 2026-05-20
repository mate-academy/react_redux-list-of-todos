import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';
import React, { useEffect } from 'react';
import { fetchUser } from '../../features/user';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const { data: user, loading } = useAppSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (currentTodo) {
      dispatch(fetchUser(currentTodo.userId));
    }

    return () => {};
  }, [currentTodo, dispatch]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(clearCurrentTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          <div className="block" data-cy="modal-user">
            {currentTodo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            {loading ? (
              <Loader data-cy="loader" />
            ) : user ? (
              <a href={`mailto:${user.email}`}>{user.name}</a>
            ) : (
              'Unknown user'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
