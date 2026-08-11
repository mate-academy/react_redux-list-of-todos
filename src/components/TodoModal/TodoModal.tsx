import React from 'react';

import classNames from 'classnames';

import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  isLoading,
  onClose,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

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
            onClick={onClose}
          />
        </header>

        <div className="modal-card-body">
          {isLoading || !user ? (
            <Loader />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
