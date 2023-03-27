import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getUser } from '../../api';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onClose }) => {
  const [user, setUser] = useState<User>();

  const {
    id,
    completed,
    title,
    userId,
  } = todo;

  useEffect(() => {
    getUser(userId)
      .then(person => setUser(person));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className={classNames(
          'modal-card',
          'notification',
          {
            'is-success': completed,
            'is-danger': !completed,
          },
        )}
        >
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block has-text-dark" data-cy="modal-title">
              {title}
            </p>

            <p className="block has-text-dark" data-cy="modal-user">
              {completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
