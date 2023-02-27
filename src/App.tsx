/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { todos, currentTodo } = useAppSelector(state => state);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  function filterFunction(todo: Todo): boolean {
    const matchingQuery
      = todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

    if (!matchingQuery) {
      return false;
    }

    switch (status) {
      case Status.ACTIVE:
        return !todo.completed;
      case Status.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  }

  const visibleTodos = useMemo(() => (
    todos.filter(filterFunction)
  ), [todos, query, status]);

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      const response = await getTodos();

      dispatch(actions.setTodos(response));
      setIsLoading(false);
    };

    loadTodos();
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  visibleTodos={visibleTodos}
                  selectedTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal selectedTodo={currentTodo} />}
    </>
  );
};
