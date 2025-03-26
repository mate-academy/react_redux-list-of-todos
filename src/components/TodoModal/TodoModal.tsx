import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { clearCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;
  const [user, setUser] = useState<User | null>(null); // Исправлено, чтобы избежать ошибок
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [userId]);

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
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <>
                  <strong className="has-text-success">Done</strong>
                  {' by '}
                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
