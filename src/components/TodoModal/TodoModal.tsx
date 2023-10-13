import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then(response => setUser(response))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <>
      {todo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {loading && <Loader />}

          {user && (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${todo.id}`}
                </div>

                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  aria-label="close modal"
                  onClick={() => dispatch(actionsCurrentTodo.removeTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">{todo.title}</p>

                <p className="block" data-cy="modal-user">
                  {todo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}

                  {user && (
                    <>
                      {' by '}
                      <a href={`mailto:${user?.email}`}>{user?.name}</a>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
