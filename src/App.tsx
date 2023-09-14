import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { filterTodos } from './helpers/filterTodos';
import { actions as todosActions } from './features/todos';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const [todosLoading, setTodosLoading] = useState(false);

  const todos = useAppSelector((state) => state.todos);
  const { query, sort } = useAppSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    setTodosLoading(true);
    getTodos()
      .then((todosFromServer) => dispatch(todosActions.set(todosFromServer)))
      .finally(() => setTodosLoading(false));
  }, []);

  const visibleTodos = filterTodos(todos, { query, sort });

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
              {todosLoading ? <Loader /> : <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
