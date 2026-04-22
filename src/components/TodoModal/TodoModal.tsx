import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { User } from '../../types/User';
import { getUser } from '../../api';

import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currTodo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setUser(await getUser(currTodo!.userId));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [currTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && !error && <Loader />}

      {!loading && error && 'Something went wrong when finding user'}

      {user && currTodo && !loading && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              onClick={() => dispatch(currentTodoSlice.actions.setTodo(null))}
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
