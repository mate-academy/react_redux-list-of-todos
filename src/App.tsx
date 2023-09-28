/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from "./api";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import { TodoModal } from "./components/TodoModal";
import { Loader } from "./components/Loader";
import { Todo } from "./types/Todo";
import { Select } from "./types/Select";
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

const filterTodos = (todos: Todo[], query: string, selectedCategory: Select) => {
  let filteredTodos = [...todos];
  const normalizedQuery = query.toLowerCase();

  switch (selectedCategory) {
    case Select.Completed:
      filteredTodos = filteredTodos.filter((todo: Todo) => todo.completed);
      break;
    case Select.Active:
      filteredTodos = filteredTodos.filter((todo: Todo) => !todo.completed);
      break;
    default:
      break;
  }

  if (query) {
    filteredTodos = filteredTodos
      .filter((todo: Todo) => todo.title.toLowerCase()
        .includes(normalizedQuery));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const setTodos = (td: Todo[]) => dispatch(todosActions.setTodos(td));

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);

  const selectedCategory = useAppSelector(state => state.filter.status);

  const filteredTodos = useMemo(
    () => filterTodos(todos, query, selectedCategory),
    [query, selectedCategory, todos],
  );

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res);
      })
      .catch(() => { });
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
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  filteredTodos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
