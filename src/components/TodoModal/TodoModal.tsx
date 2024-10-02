import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { currTodoActions } from '../../features/currentTodo';

interface TodoModalProps {
  selectedTodo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ selectedTodo, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTodo) {
      setLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currTodoActions.clearCurrentTodo());
                onClose();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                'Loading user...'
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
