import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const getUserInfo = async () => {
    try {
      if (!currentTodo?.userId) {
        return;
      }

      const res = await getUser(currentTodo.userId);

      setUser(res);
    } catch {
      throw new Error('Unable to load todo info');
    }
  };

  const removeUserInfo = () => dispatch(currentTodoActions.removeTodo());

  const handleButtonClick = () => removeUserInfo();

  useEffect(() => {
    getUserInfo();
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
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

            <button
              type="button"
              className="delete"
              aria-label="delete"
              data-cy="modal-close"
              onClick={handleButtonClick}
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

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
