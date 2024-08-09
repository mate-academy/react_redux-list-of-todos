import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loading, setLoading] = useState(false);
  const { userId, id, title, completed } = currentTodo;
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(currentTodoSlice.actions.removeTodo(''));
  };

  useEffect(() => {
    setLoading(true);

    getUser(userId)
      .then(response => setUser(response))
      .finally(() => setLoading(false));
  }, [userId]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleRemove}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}

              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}

              {' by '}
              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
