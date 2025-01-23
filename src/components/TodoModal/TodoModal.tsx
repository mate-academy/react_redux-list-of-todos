import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  todo: Todo | null;
  onModalToggle: (toggled: boolean) => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onModalToggle }) => {
  if (!todo) {
    return null;
  }

  const { id: todoId, completed, userId } = todo;
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
            {`Todo ${todoId}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" data-cy="modal-close" onClick={handleClose}/>
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* For not completed */}
            {completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            <a href={`mailto:${user?.name}`}>{user?.name}</a>
          </p>
        </div>
      </div>
      )}
    </div>
  );
};
