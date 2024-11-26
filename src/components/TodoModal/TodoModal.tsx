import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { currentTodoSlice, isSelected } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const todoModal = useAppSelector(isSelected);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (todoModal) {
      setIsLoading(true);
      getUser(todoModal.userId)
        .then(resp => setUser(resp))
        .finally(() => setIsLoading(false));
    }
  }, [todoModal]);

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
              Todo #{todoModal?.id}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoSlice.actions.deleteCurrentTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!todoModal?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {todoModal?.completed && (
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
