import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setLoadingUser(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoadingUser(false));
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setCurrentTodo(null))}
      />
      <div className="modal-card">
        {loadingUser && <Loader />}

        {!loadingUser && user && (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(setCurrentTodo(null))}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
