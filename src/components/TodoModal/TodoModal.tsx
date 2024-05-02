import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions as currTodoActions } from '../../features/currentTodo';
import { actions as currUserActions } from '../../features/currentUser';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const currentUser = useAppSelector(state => state.currentUser);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const isLoading = useAppSelector(state => state.loading.modal);

  const dispatch = useAppDispatch();

  const { id, title, completed } = currentTodo as Todo;
  const { name, email } = currentUser as User;

  const onClose = () => {
    dispatch(currTodoActions.removeTodo());
    dispatch(currUserActions.removeUser());
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
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={completed ? 'has-text-success' : 'has-text-danger'}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
              {` by `}
              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
