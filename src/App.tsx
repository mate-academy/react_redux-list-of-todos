import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import './App.scss';
import { Status } from './react-app-env';
import { loadTodo, useAppSelector } from './store';
import { actions } from './store/currentTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(state => state.loading);
  const selectedTodo = useAppSelector(state => state.selectedTodo);
  const todos = useAppSelector(state => state.todos);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    dispatch(loadTodo);
  }, []);

  const lowerQuery = query.toLowerCase();

  const visibleTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(lowerQuery);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                onQueryChanged={setQuery}
                status={status}
                onStatusChanged={setStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  todoId={selectedTodo?.id || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => dispatch(actions.unselectTodo())}
        />
      )}
    </>
  );
};
