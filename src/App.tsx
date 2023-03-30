/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { actions } from './features/currentTodo';
import { actions as filterAction } from './features/filter';
import { actions as todosAction } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterQuery = useAppSelector(state => state.filter.query);
  const filterStatus = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos().then((result) => {
      dispatch(todosAction.setTodos(result));
    });
  }, []);

  const filterTodo = (queryTodo: string, optionQuery: string) => {
    switch (optionQuery) {
      case 'active':
        return todos.filter(todo => !todo.completed
          && todo.title.toLowerCase().includes(queryTodo.toLowerCase()));

      case 'completed':
        return todos.filter(todo => todo.completed
          && todo.title.toLowerCase().includes(queryTodo.toLowerCase()));

      default:
        if (filterQuery.length > 0) {
          return todos.filter(
            todo => todo.title.toLowerCase().includes(queryTodo.toLowerCase()),
          );
        }

        return todos;
    }
  };

  const changeQuery = (value: string) => {
    dispatch(filterAction.setQuery(value));
  };

  const changeOption = (value: Status) => {
    dispatch(filterAction.setStatus(value));
  };

  const clearQuery = () => {
    dispatch(filterAction.setQuery(''));
  };

  const cahngedSelectTodo = (value: Todo) => {
    dispatch(actions.setTodo(value));
  };

  const closeModalTodo = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filterQuery}
                onQuery={changeQuery}
                onSelectOption={changeOption}
                onClear={clearQuery}
              />
            </div>

            <div className="block">
              {!(todos.length > 0)
                ? <Loader />
                : (
                  <TodoList
                    todos={filterTodo(filterQuery, filterStatus)}
                    onSelect={cahngedSelectTodo}
                    selectedTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          onClose={closeModalTodo}
        />
      )}
    </>
  );
};
