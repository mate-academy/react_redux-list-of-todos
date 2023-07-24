/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [todoFilter, setTodoFilter] = useState<StatusFilter>(StatusFilter.All);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(todo => {
      setTodos(todo);
    })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().trim()
      .includes(query.toLowerCase().trim());

    switch (todoFilter) {
      case StatusFilter.All:
        return todo && matchesQuery;

      case StatusFilter.COMPLETED:
        return todo.completed && matchesQuery;

      case StatusFilter.ACTIVE:
        return !todo.completed && matchesQuery;

      default:
        throw new Error(`Wrong filter, ${todoFilter} is not defined`);
    }
  });

  const getCurrentTodo = (id: number) => {
    return visibleTodos.find(todo => todo.id === id) || null;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setTodoFilter={setTodoFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    currentTodoId={currentTodoId}
                    setCurrentTodoId={setCurrentTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodoId && (
        <TodoModal
          currentTodo={getCurrentTodo(currentTodoId)}
          setCurrentTodoId={setCurrentTodoId}
        />
      )}
    </>
  );
};
