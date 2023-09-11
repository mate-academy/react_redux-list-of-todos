import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  closeTodo: () => void;
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ closeTodo, todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(res => (setUser(res)))
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? <Loader />
        : (
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
                onClick={closeTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo.title}</p>

              <p className="block" data-cy="modal-user">
                {todo.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>
                  )}

                {' by '}
                <a href="mailto:Sincere@april.biz">{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
