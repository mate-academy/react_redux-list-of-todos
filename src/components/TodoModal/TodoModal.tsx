import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { currentTodo, loading } = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionsCurrentTodo.setLoadig(true));

    const userId = currentTodo?.userId;

    if (!userId) {
      throw new Error('userId is undefined');
    }

    getUser(userId)
      .then(setUser)
      .catch(e => dispatch(actionsCurrentTodo.setLoadig(e)))
      .finally(() => dispatch(actionsCurrentTodo.setLoadig(false)));
  }, [dispatch, currentTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading && <Loader />}
      {!loading && user && currentTodo && (
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
              onClick={() => dispatch(actionsCurrentTodo.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
