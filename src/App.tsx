import React, { useEffect } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setLoading, setError } from './features/todosSlice';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.todos); // ✅ теперь правильно берём статус загрузки

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));
      try {
        // Симуляция API-запроса
        const fetchedTodos: Todo[] = [
          {
            id: 1,
            title: 'Quis ut nam facilis et officia qui',
            completed: true,
            userId: 1,
          },
          { id: 2, title: 'Fugiat veniam minus', completed: false, userId: 2 },
          {
            id: 3,
            title: 'Laboriosam mollitia et enim quasi adipisci',
            completed: true,
            userId: 3,
          },
          {
            id: 4,
            title: 'Distinctio vitae autem nihil ut molestias quo',
            completed: false,
            userId: 4,
          },
          { id: 5, title: 'Et porro tempora', completed: true, userId: 5 },
        ];

        dispatch(setTodos(fetchedTodos));
      } catch (err: unknown) {
        dispatch(setError('Failed to load todos'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const timeoutId = setTimeout(fetchTodos, 500);

    return () => clearTimeout(timeoutId); // ✅ чистим таймер
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div data-cy="loader">Loading todos...</div>
      ) : (
        <>
          <TodoFilter />
          <TodoList />
          <TodoModal />
        </>
      )}
    </div>
  );
};

export default App;
