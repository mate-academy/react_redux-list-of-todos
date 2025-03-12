/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { id, title, completed, userId } = currentTodo as Todo;

  const [user, setUser] = useState<User | {}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(response => setUser(response))
      .catch(() => {
        throw new Error('Please check your internet connection');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { email, name } = user as User;

  const close = () => {
    setUser({});
    dispatch(currentTodoActions.removeTodo());
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={close}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {!completed && (
                <strong className="has-text-danger">Planned</strong>
              )}
              {completed && <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={email}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
