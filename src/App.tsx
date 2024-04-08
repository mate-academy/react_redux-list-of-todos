import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { prepareTodos } from './helpers/prepareTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dipatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data: Todo[]) => dipatch(todosActions.setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dipatch]);

  const filteredTodos = prepareTodos(todos, { query, status });

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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
