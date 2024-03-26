import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoAction } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);

      getUser(currentTodo.userId)
        .then(selectedUser => setUser(selectedUser))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  const handleDeleteModalTodo = () => {
    dispatch(currentTodoAction.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && !!currentTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDeleteModalTodo}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
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
