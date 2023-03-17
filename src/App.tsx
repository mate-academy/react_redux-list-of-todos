/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { todosAction } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(data => dispatch(todosAction(data)));
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
              {!todos.length
                ? <Loader />
                : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
