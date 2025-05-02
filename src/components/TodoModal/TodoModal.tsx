/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
interface TodoModalProps {
  todo: Todo | null;
  onClose: () => void;
}
export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (todo !== null) {
      getUser(todo.userId)
        .then(setUser)
        // eslint-disable-next-line no-console
        .catch(console.error)
        .finally(() => setIsLoadingUser(false));
    }
  }, []);

  if (!todo || isClosing) {
    return null;
  }

  const handleClose = () => {
    setIsLoadingUser(true);
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>
        <div className="modal-card-body">
          {isLoadingUser ? (
            <Loader data-cy="modal-loader" />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {todo.title || 'No title available'}
              </p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                  data-cy="modal-status"
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>
                {user ? (
                  <>
                    {' by '}
                    <a href={`mailto:${user.email}`} data-cy="modal-user-email">
                      {user.name || 'Unknown User'}
                    </a>
                  </>
                ) : (
                  ' (User not found)'
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
