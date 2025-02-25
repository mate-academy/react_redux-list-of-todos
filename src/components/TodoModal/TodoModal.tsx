import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
  };

  useEffect(() => {
    if (!todo?.userId) {
      return;
    }

    setIsLoading(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [todo?.userId]);

  if (isLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" onClick={handleCloseModal} />
        <div className="modal-card">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </p>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleCloseModal}
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
            {user ? (
              <a href={`mailto:${user.email}`}>{user.name}</a>
            ) : (
              'Unknown'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
