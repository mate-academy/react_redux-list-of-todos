import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { title, id, completed, userId } = todo || {};

  useEffect(() => {
    if (todo) {
      getUser(userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todo, userId]);

  const handleClose = () => dispatch(currentTodoSlice.actions.removeTodo(null));
  const { name, email } = user || {};

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
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${completed ? 'success' : 'danger'}`}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
