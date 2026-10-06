import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId)
      .then(data => setUserInfo(data))
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

  const handleModalClose = () => {
    dispatch(currentTodoActions.unselectTodo());
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleModalClose}
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
              <a href={`mailto:${userInfo?.email}`}>{userInfo?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
