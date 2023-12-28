import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { AppDispatch } from '../../app/store';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
  dispatch: AppDispatch,
};

export const TodoModal: React.FC<Props> = ({ todo, dispatch }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [todo]);

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{todo.title}</p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !todo.completed,
                'has-text-success': todo.completed,
              })}
              >
                {todo.completed ? 'Done' : 'Planned'}

              </strong>
              {' by '}
              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
