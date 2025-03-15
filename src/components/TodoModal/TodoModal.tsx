/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { setSelectedTodoId } from '../../features/filter';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodoId = useAppSelector(state => state.filter.selectedTodoId);
  const todos = useAppSelector(state => state.todos);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    if (selectedTodoId && selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodoId, selectedTodo]);

  if (!selectedTodoId || !selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head" data-cy="modal-header">
          <p className="modal-card-title">{selectedTodo.title}</p>
          <button
            data-cy="modal-close"
            className="delete"
            type="button"
            onClick={() => dispatch(setSelectedTodoId(null))}
          />
        </header>
        <section className="modal-card-body">
          {isLoading ? (
            <div className="loader" data-cy="loader" />
          ) : (
            user && (
              <div>
                <p>Todo: {selectedTodo.title}</p>
                <p>User: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
};
