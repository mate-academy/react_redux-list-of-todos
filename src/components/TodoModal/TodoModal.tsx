import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../Loader';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      setLoading(true);
      getUser(currentTodo?.userId)
        .then(curentUser => setUser(curentUser))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}
      {!loading && !error && (
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
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`malito:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
