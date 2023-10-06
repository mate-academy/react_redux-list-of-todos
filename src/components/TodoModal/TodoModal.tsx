import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handlerRemoveCurrentTodo = () => {
    dispatch(actionsCurrentTodo.removeTodo());
  };

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);

      getUser(currentTodo.userId)
        .then(setUser)
        .catch(() => new Error())
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (<Loader />) : (
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
              aria-label="button delete currentTodo"
              className="delete"
              data-cy="modal-close"
              onClick={handlerRemoveCurrentTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
