/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useGlobalRequest } from './hooks/useGlobalReqest';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterParams = useAppSelector(state => state.filter);
  const [todos, isLoading, error] = useGlobalRequest(
    getTodos,
    todosActions.setTodos,
    state => state.todos,
  );

  const showTodoList = !error && !isLoading && todos.length;
  const visibleTodos = getFilteredTodos(todos, filterParams);

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
              {isLoading && <Loader />}
              {error && 'Something went wrong'}
              {showTodoList && <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
