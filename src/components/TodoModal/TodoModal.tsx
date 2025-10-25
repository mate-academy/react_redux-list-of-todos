import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/storeHooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setLoading(true);

    getUser(currentTodo.userId)
      .then(setUser)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && (
        <div className="modal-card">
          <div className="modal-card-body">
            <Loader />
          </div>
        </div>
      )}

      {!loading && !errorMessage && user !== null && (
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
              onClick={() =>
                dispatch(currentTodoSlice.actions.setCurrentTodo(null))
              }
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

      {!loading && errorMessage && (
        <div className="modal-card">
          <div className="modal-card-body">
            <div className="notification is-danger" data-cy="error">
              {errorMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
