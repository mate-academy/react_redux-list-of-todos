/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import {
  TODOS_SELECTORS,
  TODO_ACTIONS_CREATOR,
} from './features/todos';
import { getTodos } from './api';
import { selector } from './app/store';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(TODOS_SELECTORS.todosBySearchQuery(''));
  const selectedTodo = useSelector(selector.getSelectedTodo);

  useEffect(() => {
    getTodos().then(res => dispatch(TODO_ACTIONS_CREATOR.setTodoList(res)));
  }, []);

  // const todo = todos.find(element => element.id === selectedTodo?.id) || null;

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
              {todos.length
                ? (
                  <TodoList />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal />
        )}
    </>
  );
};
