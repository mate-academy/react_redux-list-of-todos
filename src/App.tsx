/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { actions as todosAction } from './features/todos';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);

  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query: filterTitle, status: filterStatus } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setFilteredTodos(
      todos.filter(todo => {
        const sortTitleLower = filterTitle.toLowerCase();
        const titleLower = todo.title.toLowerCase();

        const title = filterTitle ? titleLower.includes(sortTitleLower) : true;

        switch (filterStatus) {
          case 'completed':
            return title && todo.completed;
          case 'active':
            return title && !todo.completed;
          default:
            return title;
        }
      }),
    );
  }, [todos, filterTitle, filterStatus]);

  useEffect(() => {
    setIsLoaded(false);
    getTodos().then(data => {
      dispatch(todosAction.set(data));
      setIsLoaded(true);
    });
  }, []);

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
              {isLoaded ? (
                <TodoList todos={filteredTodos} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} />
      )}
    </>
  );
};
