import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getUser(currentTodo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [currentTodo]);

  const handleClearCurrentTodo = () => {
    dispatch(currentTodoSlice.actions.removeTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClearCurrentTodo}
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
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
