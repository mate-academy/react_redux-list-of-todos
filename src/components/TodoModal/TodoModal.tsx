import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as removeTodoAction } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (todo?.userId) {
      getUser(todo.userId)
        .then(userFS => setUser(userFS))
        .catch(() => {
          throw new Error('User not found on server!');
        })
        .finally(() => setIsLoading(false));
    }
  }, [todo?.userId]);

  const removeCurrentTodo = () => {
    dispatch(removeTodoAction.removeTodo());
    setUser(null);
  };

  return (
    <>
      {todo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoading && <Loader />}

          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={removeCurrentTodo}
                aria-label="button"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              {isLoading ? (
                <Loader />
              ) : (
                <p className="block" data-cy="modal-user">
                  <strong
                    className={
                      todo?.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo?.completed ? 'Done' : 'Planned'}
                  </strong>
                  {' by '}
                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
