import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (currentTodo?.userId) {
      setIsLoading(true);

      getUser(currentTodo.userId)
        .then(userFromServer => setUser(userFromServer))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  const closeModal = () => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));
  };

  return (
    <div
      className={classNames('modal', { 'is-active': !!currentTodo })}
      data-cy="modal"
    >
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
              {currentTodo?.title}
            </p>

            <p
              className={classNames('block', {
                'has-text-success': currentTodo?.completed,
                'has-text-danger': !currentTodo?.completed,
              })}
              data-cy="modal-user"
            >
              <strong>{currentTodo?.completed ? 'Done' : 'Planned'}</strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
