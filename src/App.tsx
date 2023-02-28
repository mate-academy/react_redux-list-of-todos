/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { actions as TodosActions } from './features/todos';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { getfilteredTodos } from './helpers/getFilteredTodos';
import { getVisibleTodos } from './helpers/getVisibleTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(receivedTodos => {
        dispatch(TodosActions.set(receivedTodos));
        setIsLoading(false);
      })
      .catch(() => {
        throw new Error('123');
      });
  }, []);

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = getfilteredTodos(todos, status);

  const visibleTodos = getVisibleTodos(filteredTodos, query);

  if (isLoading) {
    return (
      <div className="section">
        <div className="container">
          <div className="box">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">{`Todos: ${visibleTodos.length}`}</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <TodoList todos={visibleTodos} />
            </div>
            {currentTodo && <TodoModal />}
          </div>
        </div>
      </div>
    </div>
  );
};
