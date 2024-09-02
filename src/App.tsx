/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo);
  const query = useSelector((state: RootState) => state.filter.query);
  const filter = useSelector((state: RootState) => state.filter.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchTodos = async () => {
      const todosfromPromise = await getTodos();

      dispatch(setTodos(todosfromPromise));
    };

    fetchTodos();
  }, [dispatch]);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todosQuery, setTodosQuery] = useState<Todo[]>([]);

  const handleFilter = () => {
    switch (filter) {
      case FilterType.Completed:
        setFilteredTodos(todos.filter(todo => todo.completed));

        break;
      case FilterType.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));

        break;
      default:
        setFilteredTodos(todos);

        break;
    }
  };

  useEffect(() => {
    handleFilter();
    setTodosQuery(filteredTodos);
  }, [filter, query]);

  useEffect(() => {
    setTodosQuery(
      filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLocaleLowerCase()),
      ),
    );
  }, [query, filteredTodos]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            {todos.length === 0 ? (
              <Loader />
            ) : (
              <TodoList
                todos={todosQuery.length > 0 || query ? todosQuery : todos}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
