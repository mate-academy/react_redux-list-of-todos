import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [hasLoadingError, setLoadingError] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const removeCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  const getUserFromServer = async (id: number) => {
    setLoadingError(true);
    try {
      const userFromServer = await getUser(id);

      setCurrentUser(userFromServer);
      setLoadingError(false);
    } catch (error) {
      setLoadingError(true);
    }
  };

  useEffect(() => {
    if (currentTodo) {
      getUserFromServer(currentTodo.userId);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {hasLoadingError ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                removeCurrentTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href="mailto:Sincere@april.biz">{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
