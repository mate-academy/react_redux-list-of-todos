/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const setTodos = (todosToSet: Todo[]) => dispatch(todosActions.setTodos(todosToSet));

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  }, []);
  const todos = useAppSelector(state => state.todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {
              todos.length === 0
                ? <Loader />
                : (
                  <>
                    <h1 className="title">Todos:</h1>
                    <div className="block">
                      <TodoFilter />
                    </div>
                    <div className="block">
                      <TodoList />
                    </div>
                  </>
                )
            }
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
