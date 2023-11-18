import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const closeModal = () => dispatch(actions.removeTodo());

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(user => {
        setSelectedUser(user);
      });
    }
  }, []);

  return (
    currentTodo && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!selectedUser ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {currentTodo.id}
              </div>

              <button
                aria-label="close"
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => closeModal()}
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

                <a href={`mailto: ${currentTodo && selectedUser.email}`}>
                  {currentTodo && selectedUser.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
