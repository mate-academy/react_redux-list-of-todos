import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import React from 'react';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const todos = useAppSelector(state => state.todosReducer);
  const selectedTodo = useAppSelector(state => state.currentTodoReducer);
  const filterBy = useAppSelector(state => state.filterReducer.status);
  const query = useAppSelector(state => state.filterReducer.query);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.setTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo: Todo) => {
        switch (filterBy) {
          case Status.active:
            return !todo.completed;

          case Status.completed:
            return todo.completed;

          default:
            return todo;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
      );
  }, [filterBy, todos, query]);

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
              {isLoading && <Loader />}
              {!isLoading && todos.length && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
