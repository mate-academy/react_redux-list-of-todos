import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserFromAPI = async () => {
      try {
        if (currentTodo !== null) {
          setUser(await getUser(currentTodo.userId));
        }
      } catch (error) {
        throw new Error('Error fetching user');
      }
    };

    fetchUserFromAPI();
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentTodo || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
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

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
