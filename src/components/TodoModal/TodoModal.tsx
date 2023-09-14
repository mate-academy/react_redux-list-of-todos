import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { User } from '../../types/User';

import { actions as CurrentTodoActions } from '../../features/currentTodo';

type Props = {
  selectedUser: User | null,
  changeUserId(todoId: number | null): void,
  loadUser(): void,
  resetUser(): void,
};

export const TodoModal: React.FC<Props> = (
  {
    selectedUser,
    changeUserId,
    loadUser,
    resetUser,
  },
) => {
  useEffect(() => {
    loadUser();
  }, []);

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const clearCurrentTodo = () => dispatch(CurrentTodoActions.removeTodo());

  return (
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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                clearCurrentTodo();
                changeUserId(null);
                resetUser();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
