/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { getFilteredTodos } from './components/helpers/getFilteredTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todoListLoaded, setTodolistLoaded] = useState(false);

  const dispatch = useAppDispatch();
  const { query, select } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const visibleTodos = useAppSelector(state => state.todos);

  useEffect(() => {
    (async () => {
      setTodosFromServer(await getTodos());
      setTodolistLoaded(true);
    })();
  }, []);

  useEffect(() => {
    dispatch(actions.setTodos(getFilteredTodos(todosFromServer, query, select)));
  }, [query, select, todosFromServer]);

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
              {todoListLoaded
                ? (
                  <TodoList
                    todos={visibleTodos}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
      && <TodoModal />}
    </>
  );
};
