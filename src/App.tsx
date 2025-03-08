/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/store';
import { setFilter, setQuery } from './features/filter';
import { addTodos } from './features/todos';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { setCurrentTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const [todoLoader, setTodoLoader] = useState(true);
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    setTodoLoader(true);
    getTodos()
      .then(result => {
        dispatch(addTodos(result));
      })
      .catch(e => console.error('Todos Loading error: ', e))
      .finally(() => setTodoLoader(false));
  }, [dispatch]);

  const filterTodos = useCallback(
    (posts: Todo[], filterBy: Status, queryParam: string) => {
      let filtered = [...posts];

      if (filterBy === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
      } else if (filterBy === 'active') {
        filtered = filtered.filter(todo => !todo.completed);
      }

      return filtered.filter(todo =>
        todo.title.toLowerCase().includes(queryParam.toLowerCase()),
      );
    },
    [],
  );

  const filteredTodos = useMemo(
    () => filterTodos(todos, status, appliedQuery),
    [todos, status, appliedQuery, filterTodos],
  );

  const applyQuery = useCallback(
    debounce((value: string) => setAppliedQuery(value), 500),
    [],
  );

  const handleInputFilter = (value: string) => {
    dispatch(setQuery(value));
    applyQuery(value);
  };

  const handleFilter = (filterBy: Status) => dispatch(setFilter(filterBy));

  const resetInputQuery = () => {
    dispatch(setQuery(''));
    setAppliedQuery('');
  };

  const openPost = (todo?: Todo | null) => {
    dispatch(setCurrentTodo(todo || null));
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>
          <div className="block">
            <TodoFilter
              filter={handleFilter}
              inputFilter={handleInputFilter}
              inputValue={query}
              reset={resetInputQuery}
            />
          </div>
          <div className="block">
            {todoLoader ? (
              <Loader />
            ) : (
              <TodoList
                todos={filteredTodos}
                openPost={openPost}
                selectedTodo={currentTodo}
              />
            )}
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal post={currentTodo} closeModal={openPost} />}
    </div>
  );
};
