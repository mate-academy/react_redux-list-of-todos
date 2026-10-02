import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos, setLoading, setError } from './features/todos';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import './App.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo.todo);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch(setLoading(true));
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (err) {
        dispatch(setError('Failed to load todos'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadTodos();
  }, [dispatch]);

  const filteredTodos = items
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoFilter />
      <TodoList todos={filteredTodos} />
      {currentTodo && <TodoModal todo={currentTodo} />}
    </div>
  );
};
