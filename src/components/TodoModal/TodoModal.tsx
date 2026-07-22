import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

import classNames from 'classnames';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.todos.loading);

  const todo = useAppSelector(state => state.currentTodo);

  const isOpen = !!todo;
  const onClose = () => dispatch(setCurrentTodo(null));
  const user = { name: 'User', email: 'user@example.com' };

  return (
    <div
      className={classNames('modal', { 'is-active': isOpen })}
      data-cy="modal"
    >
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        {loading ? (
          <Loader />
        ) : (
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo?.id}
              </div>
              <button
                onClick={onClose}
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close"
              />
            </header>
            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>
              <p className="block" data-cy="modal-user">
                {user && (
                  <>
                    <strong
                      className={classNames(
                        todo?.completed
                          ? 'has-text-success'
                          : 'has-text-danger',
                      )}
                    >
                      {todo?.completed ? 'Done' : 'Planned'}
                    </strong>
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
