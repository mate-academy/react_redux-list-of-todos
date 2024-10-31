import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';

import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { useAppDispatch } from '../../features/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  currentTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const deleteCurrentTodo = () =>
    dispatch(currentTodoActions.deleteCurrentTodo());

  useEffect(() => {
    setIsLoading(true);
    getUser(currentTodo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [currentTodo.userId]);

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
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => deleteCurrentTodo()}
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
