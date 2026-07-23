import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { userService } from '../../services/userService';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const { actions } = currentTodoSlice;

  useEffect(() => {
    setIsLoading(true);

    userService
      .getById(todo.userId)
      .then(resposne => {
        setUser(resposne);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
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
              onClick={() => dispatch(actions.clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {user && (
                <>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
