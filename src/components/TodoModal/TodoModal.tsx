import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodoSlice';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(s => s.currentTodo.selected);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (todo) {
      setLoading(true);
      setUser(null);
      setTimeout(() => {
        setUser(`User ${todo.userId}`);
        setLoading(false);
      }, 500);
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div data-cy="modal">
      {loading ? (
        <div data-cy="loader">Loading...</div>
      ) : (
        <div>
          <h2 data-cy="modal-header">{todo.title}</h2>
          <p data-cy="modal-user">{user}</p>
          <button
            data-cy="modal-close"
            onClick={() => dispatch(setCurrentTodo(null))}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
