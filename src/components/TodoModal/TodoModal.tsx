import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(todo?.userId)
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  const closeModal = () => {
    dispatch(actions.removeTodo());
  };

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
              {`Todo #${todo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
              aria-label="Close"
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

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
