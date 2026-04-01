import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hook';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      getUser(currentTodo.userId)
        .then(setSelectedUser)
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(currentTodoSlice.actions.delete())}
      />

      {!user || isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoSlice.actions.delete())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}{' '}
              by{' '}
              <a href={`mailto:${user.email}`} data-cy="modal-user-email">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
