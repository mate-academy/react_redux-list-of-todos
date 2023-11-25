import React, { useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  if (!todo) {
    return null;
  }

  if (todo) {
    getUser(todo.userId)
      .then(data => setUser(data))
      .catch(err => alert(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #
            {todo?.id}
          </div>

          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(actions.removeTodo())}
          >
            {}
          </button>
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{todo?.title}</p>

          <p className="block" data-cy="modal-user">
            <strong
              className={cn(
                { 'has-text-danger': !todo?.completed },
                { 'has-text-success': todo?.completed },
              )}
            >
              {!todo?.completed && 'Planned'}
              {todo?.completed && 'Done'}
            </strong>

            {' by '}
            <a href={user?.email}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
