import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  function handleCloseModal() {
    dispatch(currentTodoSlice.actions.changeCurrentTodo(null));
  }

  useEffect(() => {
    setIsLoading(true);
    getUser(currentTodo!.userId)
      .then(setUser)
      .catch(() => {
        throw new Error('User load fail');
      })
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo!.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo!.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">
                {currentTodo!.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
