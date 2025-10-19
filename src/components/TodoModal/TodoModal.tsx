import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(curuser => {
        setUser(curuser);
      });
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const { id, title, completed } = currentTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setCurrentTodo(null))}
      />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
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
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>{' '}
              by <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
