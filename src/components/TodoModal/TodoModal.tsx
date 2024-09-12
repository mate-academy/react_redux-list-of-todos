import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { modalSlice } from '../../features/modalSlice';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const handleCloseModal = () => {
    dispatch(modalSlice.actions.closeModal(false));
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));
  };

  const isCompleted = currentTodo.completed;

  useEffect(() => {
    const userId = currentTodo.userId;

    if (!userId) {
      return;
    }

    getUser(userId)
      .then(data => {
        setUser(data);
      })
      .catch(e => {
        throw new Error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}
      {!isLoading && (
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
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!isCompleted ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
