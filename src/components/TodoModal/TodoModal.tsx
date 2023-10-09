import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  todo: Todo | null,
  setTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
};

export const TodoModal: React.FC<Props> = ({
  loading,
  setLoading,
  todo,
  setTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleCLick = () => {
    setTodo(null);
  };

  useEffect(() => {
    getUser(todo?.userId as number)
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCLick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !todo?.completed,
                  'has-text-success': todo?.completed,
                })}
              >
                {todo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

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
