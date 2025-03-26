import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
  user: User | null;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  onClose,
  user,
}) => {
  const [modalUser, setModalUser] = useState<User | null>(user);

  useEffect(() => {
    if (!user) {
      getUser(todo.userId).then(setModalUser);
    }
  }, [todo.userId, user]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {modalUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <p
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </p>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              {modalUser ? (
                <a href={`mailto:${modalUser.email}`}>{modalUser.name}</a>
              ) : (
                'Unknown'
              )}
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
