import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import * as currentTodoActions from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo, user, isLoading } = useAppSelector(
    state => state.currentTodo,
  );

  const isTodoDone = currentTodo?.completed;

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    dispatch(currentTodoActions.setLoading(true));

    getUser(currentTodo.userId)
      .then(data => {
        dispatch(currentTodoActions.setUser(data));
      })
      .finally(() => {
        dispatch(currentTodoActions.setLoading(false));
      });
  }, [currentTodo, dispatch]);

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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoActions.setTodo(null));
                dispatch(currentTodoActions.setUser(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {isTodoDone ? (
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
