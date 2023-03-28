/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const todoDispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const addTodos = (newTodo: Todo) => (todoDispatch(todosActions.add(newTodo)));

  useEffect(() => {
    getTodos()
      .then(todosFromServer => todosFromServer
        .forEach(todo => addTodos(todo)));
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
              {
                todos.length > 0 ? (
                  <TodoList />
                ) : (
                  <Loader />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {
        currentTodo && (
          <TodoModal />
        )
      }
    </>
  );
};
