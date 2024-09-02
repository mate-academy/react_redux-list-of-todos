/* eslint-disable */

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/Hooks';
import * as todosActions from './features/todos';
import { useEffect } from 'react';

export const App = () => {
  const todos = useAppSelector(state => state.todos.arrayOfTodos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.init());
  }, []);

  useEffect(() => {

  })

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
              {todos ? <TodoList todos={todos} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
