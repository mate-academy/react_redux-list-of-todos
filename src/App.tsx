/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      const response = await getTodos();

      setTodos(response);
      setIsLoading(false);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!todos) {
      return;
    }

    let processedTodos = [...todos];

    if (query) {
      processedTodos = processedTodos.filter(todo => (
        todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ));
    }

    processedTodos = processedTodos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });

    if (!processedTodos.length) {
      setVisibleTodos(null);

      return;
    }

    setVisibleTodos(processedTodos);
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} />}
    </>
  );
};
