/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SortType } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';

export function checkQuery(query:string, content:string) {
  return (content.toLowerCase())
    .includes(query.toLowerCase());
}

export const App: React.FC = () => {
  const [todoId, setTodoId] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const todos:Todo[] = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setIsLoaded(true);
    dispatch(actions.load(todosFromServer));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = todos
    .filter(({ completed, title }) => {
      switch (filter) {
        case SortType.ACTIVE:
          return !completed && checkQuery(query, title);

        case SortType.COMPLETED:
          return completed && checkQuery(query, title);

        default:
          return checkQuery(query, title);
      }
    });

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
                !isLoaded
                  ? <Loader />
                  : (
                    <TodoList
                      filteredTodos={filteredTodos}
                      selectedTodoId={todoId}
                      selectTodo={setTodoId}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>

      {!!todoId && (
        <TodoModal
          todoId={todoId}
          filteredTodos={filteredTodos}
          setTodoId={setTodoId}
        />
      )}

    </>
  );
};
