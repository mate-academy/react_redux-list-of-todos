/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterTypes } from './types/FilterTypes';
import { todosSlice } from './features/todos';
import { currentTodoSlice } from './features/currentTodo';
import { filterSlice } from './features/filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const query = useSelector((state: RootState) => state.filter.query);
  const filterMethod = useSelector((state: RootState) => state.filter.status);

  const dispatch = useDispatch();

  const onClickHandler = (currentTodo: Todo | null) => {
    dispatch(currentTodoSlice.actions.selectTodo(currentTodo));
  };

  useEffect(() => {
    getTodos().then(todosFromServer => {
      dispatch(todosSlice.actions.setTodos(todosFromServer));
    });
  }, [dispatch]);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.setQuery(event.target.value));
  };

  const onChangeFilterHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(filterSlice.actions.setFilter(event.target.value as FilterTypes));
  };

  const resetQuery = () => {
    dispatch(filterSlice.actions.setQuery(''));
  };

  const filteredTodos = todos.filter(todo => {
    const hasQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    switch (filterMethod) {
      case FilterTypes.active:
        return !todo.completed && hasQuery;

      case FilterTypes.completed:
        return todo.completed && hasQuery;

      case FilterTypes.all:
      default:
        return hasQuery;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={onChangeFilterHandler}
                onInputChange={onChangeInputHandler}
                query={query}
                reset={resetQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              {todos.length !== 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onClickHandler={onClickHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={onClickHandler}
        />
      )}
    </>
  );
};
