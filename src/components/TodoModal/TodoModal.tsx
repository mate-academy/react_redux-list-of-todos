import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as actionsCurrentTodos } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoadingModal(true);

    if (currentTodo?.userId) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoadingModal(false));
    }
  }, [currentTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingModal && <Loader />}

      { !isLoadingModal && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actionsCurrentTodos.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!currentTodo?.completed
              && <strong className="has-text-danger">Planned</strong>}

              {/* For completed */}
              {currentTodo?.completed
              && <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
