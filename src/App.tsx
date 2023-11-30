/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as currentTodoActions } from './features/currentTodo';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userId, setUserId] = useState(0);

  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const fetchData = async () => {
      try {
        const data: Todo[] = await getTodos();

        dispatch(todosActions.set(data));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTodos = useMemo(() => {
    let copyOfTodos = [...todos];

    copyOfTodos = copyOfTodos.filter(todo => {
      switch (status) {
        case Filter.Completed:
          return todo.completed;
        case Filter.Active:
          return !todo.completed;
        default:
          return todo;
      }
    });

    const queryCorrect = query.trim().toLowerCase() || '';

    if (queryCorrect) {
      copyOfTodos = copyOfTodos.filter(todo => (
        todo.title.toLowerCase().includes(queryCorrect)
      ));
    }

    return copyOfTodos;
  }, [status, query, todos]);

  const handleClose = () => {
    setUserId(0);
    dispatch(currentTodoActions.removeTodo());
  };

  const getTodoInfo = (todo: Todo, id: number) => {
    setUserId(id);
    dispatch(currentTodoActions.setTodo(todo));
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

            {isLoading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={filteredTodos}
                  currentTodo={currentTodo}
                  getTodoInfo={getTodoInfo}
                />
              </div>
            )}

            {hasError && (
              <p className="notification is-warning">
                There are no todos
              </p>
            )}

            {!filteredTodos.length && query && (
              <p className="notification is-warning">
                There are no todos by your criteria
              </p>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          userId={userId}
          handleClose={handleClose}

        />
      )}
    </>
  );
};
