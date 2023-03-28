import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentTodoDispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const removeCurrentTodo = () => (currentTodoDispatch(actions.removeTodo()));

  useEffect(() => {
    if (currentTodo !== null) {
      getUser(currentTodo.userId)
        .then(setCurrentUser);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        currentTodo && currentUser ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {currentTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  removeCurrentTodo();
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {
                  currentTodo.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )
                }
                {' by '}
                <a href={`mailto:${currentUser?.email}`}>
                  {currentUser?.name}
                </a>
              </p>
            </div>
          </div>
        ) : (
          <Loader />
        )
      }
    </div>
  );
};
