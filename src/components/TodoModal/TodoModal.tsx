import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser as getUserById } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const {
    id,
    userId,
    completed,
    title,
  } = currentTodo || {};

  const userFromServer = async () => {
    if (!userId) {
      return;
    }

    try {
      const response = await getUserById(userId);

      setUser(response);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  useEffect(() => {
    userFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user
        ? <Loader />
        : (
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
                onClick={() => dispatch(currentTodoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{title}</p>

              <p className="block" data-cy="modal-user">
                {
                  completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }

                {' by '}

                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
