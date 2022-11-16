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
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [todoListLoaded, setTodolistLoaded] = useState(false);

  const { query, select } = useAppSelector(state => state.filter);

  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    (async () => {
      setTodosFromServer(await getTodos());
      setTodolistLoaded(true);
    })();
  }, []);

  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todosFromServer, query, select));
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
