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
  const { loading: isLoading } = useSelector(selectors.todos);
  const { todo: selectedTodo } = useSelector(selectors.currentTodo);

  const [isTodosError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      })
      .catch(() => dispatch(todosActions.setError(true)))
      .finally(() => dispatch(todosActions.setLoading(false)));
  }, []);

  const handleRandomizeClick = useCallback(() => {
    const shuffledTodos = [...visibleTodos];

    for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (
        i + 1
      ));

      [shuffledTodos[i], shuffledTodos[j]]
        = [shuffledTodos[j], shuffledTodos[i]];
    }

    setVisibleTodos(shuffledTodos);
  }, [visibleTodos]);

  useEffect(() => {
    const loweredQuery = query.toLowerCase();

    let newVisibleTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(loweredQuery)
    ));

    switch (status) {
      case Status.Active:
        newVisibleTodos = newVisibleTodos.filter(todo => !todo.completed);
        break;

      case Status.Completed:
        newVisibleTodos = newVisibleTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    setVisibleTodos(newVisibleTodos);
  }, [todos, query, status]);

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
                  <TodoList todos={visibleTodos} />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo.id && (
        <TodoModal />
      )}
    </>
  );
};
