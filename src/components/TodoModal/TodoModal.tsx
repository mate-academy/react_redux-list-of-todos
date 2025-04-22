import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTodo, user, loading, error } = useAppSelector(
    state => state.currentTodo,
  );

  useEffect(() => {
    dispatch(currentTodoActions.setLoading(true));
    getUser(currentTodo?.userId ?? 0)
      .then(userFromServer => {
        dispatch(currentTodoActions.setUser(userFromServer));
      })
      .catch(() => {
        dispatch(currentTodoActions.setError('Something went wrong'));
      })
      .finally(() => {
        dispatch(currentTodoActions.setLoading(false));
      });
  }, [dispatch, currentTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.setCurrentTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

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
      )}
    </div>
  );
};
