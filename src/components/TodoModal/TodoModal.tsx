import React, { useEffect, useState } from 'react';

import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/todoReducer';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [userFromServer, setUserFromServer] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId)
        .then(setUserFromServer)
        .catch(() => {
          setUserFromServer(null);
        });
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  const renderUserInfo = () => {
    if (!userFromServer) {
      return <p>Loading user...</p>;
    }

    return <a href={`mailto:${userFromServer.email}`}>{userFromServer.name}</a>;
  };

  const renderTodoStatus = () => {
    const statusText = currentTodo.completed ? 'Done' : 'Planned';

    return (
      <strong
        className={
          currentTodo.completed ? 'has-text-success' : 'has-text-danger'
        }
      >
        {statusText.trim()}
      </strong>
    );
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {userFromServer === null ? (
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
              {renderTodoStatus()} {'by '}
              {renderUserInfo()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
