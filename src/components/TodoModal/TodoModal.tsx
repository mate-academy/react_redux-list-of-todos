import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  todo: Todo | null;
  closeModal: () => void;
}

export const TodoModal: React.FC<Props> = ({ todo, closeModal }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      setUser(null);

      return;
    }

    getUser(todo.userId)
      .then(setUser)
      .catch(() => setUser(null));
  }, [todo]);

  return (
    <div
      className={classNames('modal', { 'is-active': !!todo })}
      data-cy="modal"
    >
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
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
