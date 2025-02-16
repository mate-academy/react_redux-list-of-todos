import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { currTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo) as Todo;
  const dispatch = useAppDispatch();
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    setIsUserLoading(true);
    getUser(currentTodo.userId)
      .then(userFromServer => {
        setTodoOwner(userFromServer);
      })
      .catch()
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [currentTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading && <Loader />}

      {!isUserLoading && (
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
              onClick={() => {
                dispatch(currTodoActions.clearCurrentTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">{`Done by `}</strong>
              ) : (
                <strong className="has-text-danger">{`Planned by `}</strong>
              )}
              <a href={`mailto:${todoOwner?.email}`}>{todoOwner?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
