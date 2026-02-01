import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppSelector } from '../../hooks/useAppSelector';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { setTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface TodoModalProps {
  isOpen: boolean;
}

export const TodoModal: React.FC<TodoModalProps> = ({ isOpen }) => {
  const currentTodo = useAppSelector(state => state.currentTodo) as Todo | null;
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setLoading(true);
    getUser(currentTodo.userId)
      .then(u => setUser(u))
      .finally(() => setLoading(false));
  }, [currentTodo]);

  if (!isOpen || !currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setTodo(null))}
      />

      {loading || !user ? (
        <Loader />
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
              onClick={() => dispatch(setTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
