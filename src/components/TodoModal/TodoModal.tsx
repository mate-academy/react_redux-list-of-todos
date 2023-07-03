/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  async function getUsersFromServer() {
    setLoading(true);

    try {
      const user = await getUser(selectedTodo?.userId || null);

      setSelectedUser(user);
    } catch (error) {
      window.console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  }

  const closeModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={closeModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!selectedTodo?.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {!!selectedTodo?.completed && (
                  <strong className="has-text-success">Done</strong>
                )}

                {' by '}
                <a href={`mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
