/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { actions as statusActions } from './features/filter';
import { actions as currentTodoActions } from './features/currentTodo';
import { getFilteredTodos } from './helpers/getFilteredTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Status } from './enum/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTodos()
      .then((response) => (
        dispatch(todosActions.loadTodo(response))
      ))
      .catch(() => (
        setIsError(true)
      ))
      .finally(() => (
        setIsLoading(false)
      ));
  }, [dispatch]);

  const handleStatus = (selectedStatus: Status) => {
    dispatch(statusActions.changeStatus(selectedStatus));
  };

  const handleQuery = (enteredQuery: string) => {
    dispatch(statusActions.changeQuery(enteredQuery));
  };

  const handleSetTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const handleRemoveTodo = (todo: Todo) => {
    dispatch(currentTodoActions.removeTodo(todo));
  };

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, { query, status });
  }, [query, status, todos]);

  const isShowTodos = isLoading && !isError && !!todos.length;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatus={handleStatus}
                onQuery={handleQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {isError && <p className="notification is-warning">Somerthing went wrong</p>}
              <TodoList
                onSetTodo={handleSetTodo}
                currentTodo={currentTodo}
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>

      </div>
      {isShowTodos && <TodoModal />}
    </>
  );
};
