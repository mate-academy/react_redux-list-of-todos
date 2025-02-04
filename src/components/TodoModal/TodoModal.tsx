import React, { useEffect, useState } from 'react';

import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  onModalToggle: (toggled: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({ todo, onModalToggle }) => {
  const { id: todoId, title: todoTitle, completed, userId } = todo;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  const handleClose = () => {
    onModalToggle(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
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
              {`Todo #${todoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoTitle}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
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
