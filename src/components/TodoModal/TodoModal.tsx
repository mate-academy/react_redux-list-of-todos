import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch } from '../../features/hooks';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    setIsUserLoaded(true);
    getUser(todo.userId)
      .then(userFromServer => setUser(userFromServer))
      .finally(() => setIsUserLoaded(false));
  }, [todo.userId]);

  function handleClear() {
    dispatch(currentTodoSlice.actions.clearCurrentTodo());
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <Loader isLoaded={isUserLoaded} />

      {!isUserLoaded && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleClear()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
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
