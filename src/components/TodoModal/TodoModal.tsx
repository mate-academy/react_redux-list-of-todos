import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodo } from '../../features/currentTodo';
import { fetchUser, resetUser } from '../../features/currentUser';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo.selectedTodo);
  const { user, error, loading } = useAppSelector(state => state.currentUser);

  useEffect(() => {
    if (selectedTodo) {
      dispatch(fetchUser(selectedTodo.userId));
    }

    return () => {
      dispatch(resetUser()); // <-- теперь TS видит, что это функция
    };
  }, [selectedTodo, dispatch]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading && <Loader />}
      {!loading ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setSelectedTodo(null))}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
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
        error && <p className="has-text-danger">Error: {error}</p>
      )}
    </div>
  );
};
