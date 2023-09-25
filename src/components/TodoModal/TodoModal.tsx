import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type TodoModalProps = {
  todo: Todo;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | null>(null);

  const onReset = () => {
    dispatch(actions.removeTodo());
  };

  useEffect(() => {
    getUser(todo.userId)
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        throw error;
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              { todo?.id }
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={onReset}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
