import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Loader } from '../Loader';
import { User } from '../../types/User';

interface TodoModalProps {
  onClose: () => void;
  user: User | null;
}

export const TodoModal: React.FC<TodoModalProps> = ({ onClose, user }) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentTodo) {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>
            {user && (
              <p className="block" data-cy="modal-user">
                <strong>{user.name}</strong> {' by '}
                <strong
                  className={
                    currentTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {currentTodo.completed ? 'Done' : 'Planned'}
                </strong>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
