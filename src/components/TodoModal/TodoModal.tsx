//#region imports
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
//#endregion

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    setIsError(false);

    getUser(todo.userId)
      .then(setUser)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (user || isError) && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoSlice.actions.set(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              ) : (
                'Unknown user'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
