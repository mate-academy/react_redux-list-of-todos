import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleClickClose = () => dispatch(currentTodoActions.removeTodo());

  const loadUser = async () => {
    if (!currentTodo) {
      return;
    }

    try {
      setIsLoadingUser(true);
      const userFromServer = await getUser(currentTodo.userId);

      setUser(userFromServer);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser && <Loader />}

      {!isLoadingUser && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              aria-label="closeModal"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClickClose}
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

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
