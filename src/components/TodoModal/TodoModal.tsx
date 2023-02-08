import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo;
  onDeleteSelection: () => void
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onDeleteSelection,
}) => {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(user => setCurrUser(user))
      .catch(() => setCurrUser(null))
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

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
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onDeleteSelection}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames(
                  { 'has-text-danger': !selectedTodo.completed },
                  { 'has-text-success': selectedTodo.completed },
                )}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {currUser
                ? (
                  <a href={`mailto:${currUser.email}`}>
                    {currUser.name}
                  </a>
                ) : (
                  <span>
                    Anonymous
                  </span>
                )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
