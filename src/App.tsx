/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { actions as actionsTodos } from './features/todos';
import { useAppSelector } from './app/hooks';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const { todos, load } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const { openTodoModal } = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsTodos.load());
    getTodos()
      .then(res => {
        dispatch(actionsTodos.set(res));
      });
  }, []);

  const filteredHandler = () => {
    return todos.filter(todo => todo.title.includes(query)).filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });
  };

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
              {load ? <Loader /> : (
                <TodoList todos={filteredHandler()} />
              )}
            </div>
          </div>
        </div>
      </div>

      {openTodoModal && <TodoModal />}
    </>
  );
};
