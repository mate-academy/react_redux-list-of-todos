import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { todosActions } from '../../features/todos';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, selectedTodoId } = useAppSelector(state => state.todos);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const todo = items.find(t => t.id === selectedTodoId);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setIsLoadingUser(true);
    setUser(null);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, [todo?.userId]);

  if (!selectedTodoId) {
    return null;
  }

  if (!todo) {
    return <Loader />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(todosActions.clearSelectedTodo())}
      />

      {isLoadingUser && <Loader />}

      {!isLoadingUser && user && (
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
              onClick={() => dispatch(todosActions.clearSelectedTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!todo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}
              {todo.completed && (
                <strong className="has-text-success">Done</strong>
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
