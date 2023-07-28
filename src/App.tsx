/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as actionTodos } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const todos = useAppSelector((state) => state.todos);
  const selectTodo = useAppSelector((state) => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        dispatch(actionTodos.setTodos(loadedTodos));
      } catch (error) {
        setIsError(true);
        throw new Error('Error fetching todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const visibleTodos = useMemo(() => {
    let todoList = [...todos];

    todoList = todoList.filter(todo => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;
        case Status.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      return todoList.filter((todo) => todo.title.includes(normalizedQuery));
    }

    return todoList;
  }, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {isLoading && <Loader />}

            {isError && (
              <p className="notification is-warning">
                Error fetching todos
              </p>
            )}

            {!visibleTodos.length && query && (
              <p className="notification is-warning">
                There are no todos matching current filter criteria
              </p>
            )}

            {visibleTodos.length > 0 && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {selectTodo && <TodoModal />}
    </>
  );
};
