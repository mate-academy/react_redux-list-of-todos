/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as currentTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(0);
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const todosFromServer = await getTodos();

      dispatch(todosActions.set(todosFromServer));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const visibleTodos = useMemo(() => {
    let copyArrayTodos = [...todos];

    if (query.trim() !== '') {
      copyArrayTodos = copyArrayTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (status) {
      case 'active':
        return (copyArrayTodos.filter(todo => !todo.completed));

      case 'completed':
        return (copyArrayTodos.filter(todo => todo.completed));

      default:
        return copyArrayTodos;
    }
  }, [todos, status, query]);

  const handleTodoInfo = (id: number, todo: Todo) => {
    setUserId(id);
    dispatch(currentTodoActions.setTodo(todo));
  };

  const handleCloseModal = () => {
    setUserId(0);
    dispatch(currentTodoActions.removeTodo());
  };

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

              {!loading
                && (
                  <TodoList
                    todos={visibleTodos}
                    currentTodo={currentTodo}
                    handleTodoInfo={handleTodoInfo}
                  />
                )}

              {error && (
                <p className="notification is-warning">
                  There are no todos on server
                </p>
              )}

              {!visibleTodos.length && query && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          userId={userId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
