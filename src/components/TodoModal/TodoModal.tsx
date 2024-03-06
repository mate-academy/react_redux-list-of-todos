import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
  onRemoveCurrentTodo: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, onRemoveCurrentTodo }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo.userId) {
      getUser(todo.userId).then(d => setUser(d));
    }
  }, [todo]);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => onRemoveCurrentTodo()}
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
            <a href={`mailto:${user.email}`}>{user.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
