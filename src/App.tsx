// src/App.tsx
import React, { useEffect, useState } from 'react';
// Підключаємо Bulma та FontAwesome (для іконок)
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Використовуємо ваші типізовані хуки (або з react-redux):
import { useAppDispatch } from './app/hooks';

// Екшен для встановлення масиву todo в Redux
import { setTodos } from './features/todos';

// Компоненти
import { Loader } from './components/Loader'; // ваш готовий компонент Loader
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        // Завантажуємо УСІ 200 Todo
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const data = await response.json();

        // Зберігаємо їх у Redux
        dispatch(setTodos(data));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [dispatch]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          {/* Фільтр: (All / Active / Completed) + Search */}
          <div className="block">
            <TodoFilter />
          </div>

          {/* Показуємо loader, поки триває запит */}
          <div className="block">
            {loading && <Loader />}
            {!loading && <TodoList />}
          </div>
        </div>
      </div>

      {/* Модальне вікно для перегляду обраного todo */}
      <TodoModal />
    </div>
  );
};
