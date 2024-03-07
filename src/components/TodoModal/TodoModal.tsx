import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { getUser } from '../../api';

type Props = {
  todo: Todo;
  clearsetSelectedTodo: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  clearsetSelectedTodo = () => {},
}) => {
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoadingUser(true);

    getUser(todo.userId).then(item => {
      setUser(item);
      setLoadingUser(false);
    });
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
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
              onClick={clearsetSelectedTodo}
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
