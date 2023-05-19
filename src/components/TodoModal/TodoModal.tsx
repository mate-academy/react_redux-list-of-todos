import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTodoModal = async () => {
    try {
      if (!currentTodo) {
        return;
      }

      setIsLoading(true);

      const userInfoFromServer = await getUser(currentTodo.userId);

      setUserInfo(userInfoFromServer);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    handleTodoModal();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && !userInfo && <Loader />}

      {userInfo && currentTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="closeModal"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed
                ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
              {' by '}
              <a href={`mailto:${userInfo.email}`}>{userInfo.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
