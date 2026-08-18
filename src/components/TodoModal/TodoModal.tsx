import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodoId } from '../../features/filter';
import { getUser } from '../../api'; // Переконайся, що шлях правильний
import { User } from '../../types/User'; // Імпортуй свій тип користувача

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodoId = useAppSelector(state => state.filter.selectedTodoId);
  const todos = useAppSelector(state => state.todos.todos);

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  // Стейт для користувача та лоадера
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);

      // Завантажуємо користувача за userId поточної тудушки
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    } else {
      setUser(null);
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  const closeModal = () => {
    dispatch(setSelectedTodoId(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={closeModal} />

      {/* Показуємо лоадер, поки дані вантажаться */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
