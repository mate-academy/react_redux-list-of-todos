/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { actions } from './features/todos';
import { actions as actionsTodo } from './features/currentTodo';
import { actions as filters } from './features/filter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState(true);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const addTodos = (todosList: Todo[]) => {
      dispatch(actions.setTodos(todosList));
    };

    getTodos()
      .then(res => addTodos(res))
      .catch(error => error);
    setIsLoader(false);
  }, [dispatch]);

  const handleChangeSearch = (value: string) => {
    dispatch(filters.setQuery(value));
  };

  const handleChangeStatus = (value: Status) => {
    dispatch(filters.setStatus(value));
  };

  const showTodoUser = (todo: Todo) => {
    dispatch(actionsTodo.setTodo(todo));
  };

  const removeTodoUser = () => {
    dispatch(actionsTodo.removeTodo());
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChangeSearch={handleChangeSearch}
                handleChangeStatus={handleChangeStatus}
                query={query}
                status={status}
              />
            </div>

            <div className="block">
              <TodoList
                todos={todos}
                value={query}
                status={status}
                showTodoUser={showTodoUser}
                isLoader={isLoader}
                currentTodo={currentTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          removeTodoUser={removeTodoUser}
          todo={currentTodo}
        />
      )}
    </>
  );
};
