// src/components/TodoModal/TodoModal.tsx
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

interface User {
  id: number;
  name: string;
  email: string;
}

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(
    state =>
      state.currentTodo as {
        id: number;
        userId: number;
        title: string;
        completed: boolean;
      } | null,
  );

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    const loadUser = async () => {
      setLoadingUser(true);
      setUser(null);

      try {
        // Завантажимо дані про автора
        // напр. "https://jsonplaceholder.typicode.com/users/1"
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${currentTodo.userId}`,
        );
        const data: User = await res.json();

        setUser(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [currentTodo]);

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  // Якщо не обрано todo, не відображаємо модалку
  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            {`Todo #${currentTodo.id}`}
          </p>
          {/* Кнопка закрити */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>

        <section className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          {/* Показуємо "loading" чи "Done/Planned by..." */}
          {loadingUser && <div data-cy="loader">Loading user...</div>}

          {!loadingUser && user && (
            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user.name}
            </p>
          )}
        </section>
      </div>
    </div>
  );
};
