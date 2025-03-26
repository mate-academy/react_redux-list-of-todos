import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError('');

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(data => setUser(data))
        .catch(() => setError('User not found'))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}
      {!isLoading && (
        <div className="modal-card">
          {!error && user ? (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{currentTodo.id}
                </div>

                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => dispatch(currentTodoSlice.actions.closeTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {currentTodo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                  {' by '}
                  <a href="mailto:Sincere@april.biz">{user.name}</a>
                </p>
              </div>
            </>
          ) : (
            <p style={{ color: 'white', marginInline: 'auto' }}>
              User not found
            </p>
          )}
        </div>
      )}
    </div>
  );
};
