import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  currentTodo: Todo,
  onTodoClose: () => void,
};

export const TodoModal: React.FC<Props> = ({ currentTodo, onTodoClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getUser(currentTodo?.userId)
      .then(currentUser => setUser(currentUser))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${currentTodo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={onTodoClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo?.completed
              ? <strong className="has-text-success">Done</strong>
              : <strong className="has-text-danger">Planned</strong>}
            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
