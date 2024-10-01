import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { currTodoActions } from '../../features/currentTodo';

interface TodoModalProps {
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const currentTodo = useSelector(
    (state: RootState) => state.currentTodo,
  ) as Todo;

  useEffect(() => {
    if (currentTodo) {
      setLoading(true);
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [currentTodo]);

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
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
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
