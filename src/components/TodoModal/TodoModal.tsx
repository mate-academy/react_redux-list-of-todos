/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getUserFromServer = async () => {
    try {
      let userFromServer;

      if (currentTodo?.userId) {
        userFromServer = await getUser(currentTodo.userId);

        setCurrentUser(userFromServer);
      }
    } catch (error) {
      throw new Error('Failed to load user');
    }
  };

  useEffect(() => {
    getUserFromServer();
  }, []);

  const closeModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentTodo && currentUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
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
              <a
                href={`mailto:${currentUser.email}`}
              >
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />

      )}
    </div>
  );
};
