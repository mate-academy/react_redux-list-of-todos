import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  pickedTodo: Todo,
  clearPickedTodo: () => void;
}

export const TodoModal: React.FC<Props>
= ({
  pickedTodo,
  clearPickedTodo,
}) => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [user, selectUser] = useState<User>();

  const {
    userId,
    id,
    title,
    completed,
  } = pickedTodo;

  useEffect(() => {
    setIsloading(true);

    getUser(userId)
      .then(selectUser)
      .finally(() => setIsloading(false));
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={clearPickedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)
              }

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
