/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';
import { setCurrentTodo } from './features/currentTodo';

function getTodos(): Promise<Todo[]> {
  return fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  ).then(response => {
    if (!response.ok) {
      throw new Error('Failed to load todos');
    }

    return response.json();
  });
}

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(loadedTodos => {
        dispatch(setTodos(loadedTodos));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

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
              {loading && <Loader />}
              {!loading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => dispatch(setCurrentTodo(null))}
        />
      )}
    </>
  );
};
