/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTodosAsync } from './store/actionCreators/todos';
import { Todo } from './types/Todo';
import { actions as currentTodoActions } from './store/reducers/currentTodo';
import { actions as currentFilterActions } from './store/reducers/filter';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const todos = useAppSelector(state => state.todos.todos);
  const isLoding = useAppSelector(state => state.todos.loading);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const onAddCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const onRemoveCurrentTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  const filteredTodos = todos.filter(todo => {
    const titleMatch = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case 'All':
        return titleMatch;
      case 'Completed':
        return todo.completed && titleMatch;
      case 'Active':
        return !todo.completed && titleMatch;
      default:
        return false;
    }
  });

  const onStatusSelect = (str: string) => {
    dispatch(currentFilterActions.setFilter(str));
  };

  const onQueryChange = (str: string) => {
    dispatch(currentFilterActions.setQuery(str));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusSelect={onStatusSelect}
                onQueryChange={onQueryChange}
                currentStatus={status}
                currentQuery={query}
              />
            </div>

            <div className="block">
              {isLoding ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onAddCurrentTodo={onAddCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          onRemoveCurrentTodo={onRemoveCurrentTodo}
        />
      )}
    </>
  );
};
