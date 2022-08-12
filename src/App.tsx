import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoModal from './components/TodoModal';
import Loader from './components/Loader';

import { getTodos } from './api/todos';

import Todo from './types/Todo';
import Status from './enums/Status';

import { selectors } from './store';
import {
  actions as todosActions,
} from './store/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { status, query } = useSelector(selectors.filter);
  const {
    loading: isLoading,
    error: isTodosError,
  } = useSelector(selectors.todos);
  const { shown: isCurrentTodoShown } = useSelector(selectors.currentTodo);

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => dispatch(todosActions.setError(true)))
      .finally(() => dispatch(todosActions.setLoading(false)));
  }, []);

  const handleRandomizeClick = useCallback(() => {
    const shuffledTodos = [...todos];

    for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (
        i + 1
      ));

      [shuffledTodos[i], shuffledTodos[j]]
        = [shuffledTodos[j], shuffledTodos[i]];
    }

    setTodos(shuffledTodos);
  }, [todos]);

  const prepareTodos = useCallback(() => {
    const loweredQuery = query.toLowerCase();

    let preparedTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(loweredQuery)
    ));

    switch (status) {
      case Status.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case Status.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return preparedTodos;
  }, [todos, query, status]);

  const preparedTodos = prepareTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onRandomizeClick={handleRandomizeClick}
              />
            </div>

            {isLoading && (
              <Loader />
            )}

            <div className="block">
              {isTodosError
                ? (
                  <h1>An error has occurred</h1>
                )
                : (
                  <TodoList todos={preparedTodos} />
                )}
            </div>
          </div>
        </div>
      </div>
      {isCurrentTodoShown && (
        <TodoModal />
      )}
    </>
  );
};
