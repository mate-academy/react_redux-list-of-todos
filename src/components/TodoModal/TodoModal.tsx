import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

import { Loader } from '../Loader';
import { User } from '../../types/User';

import cn from 'classnames';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo?.userId)
        .then(res => setUser(res))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  const handleDeleteModal = () => {
    dispatch(currentTodoSlice.actions.currentTodo(null));
  };

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
              Todo #{currentTodo?.id}
            </div>

            <button
              onClick={handleDeleteModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !currentTodo?.completed,
                  'has-text-success': currentTodo?.completed,
                })}
              >
                {currentTodo?.completed ? 'Done' : 'Planned'}
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
