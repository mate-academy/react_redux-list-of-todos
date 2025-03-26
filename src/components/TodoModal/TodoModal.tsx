import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

interface TodoModalProps {
  todo: Todo;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(userData => {
        setUser(userData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader key="loader" />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoSlice.actions.selectTodoId(0))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user ? (
                <a href={user.email}>{user.name}</a>
              ) : (
                <span>Loading user...</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
