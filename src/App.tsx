/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector, useDispatch } from 'react-redux';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { selectors } from './store';
import { actions as loadingActions } from './store/loading';
import { actions as seletedTodoActions } from './store/currentTodo';

export const App: React.FC = () => {
  const isLoaded = useSelector(selectors.isLoading);
  const selectedTodo = useSelector(selectors.getTodo);
  const dispatch = useDispatch();

  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setInitialTodos(todosFromServer);
      setTodos(todosFromServer);
      dispatch(loadingActions.startLoading());
    });
  }, []);

  useEffect(() => {
    switch (filter) {
      case Filter.All:
        setTodos(initialTodos);
        break;

      case Filter.Active:
        setTodos([...initialTodos].filter(todo => !todo.completed));

        break;

      case Filter.Completed:
        setTodos([...initialTodos].filter(todo => todo.completed));

        break;

      default:
        break;
    }

    setTodos(
      prevTodos => prevTodos.filter(
        todo => todo.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [filter, search]);

  const handleFilterSelect = (value: Filter) => {
    setFilter(value);
  };

  const handleQueryChange = (value: string) => {
    setSearch(value);
  };

  const handleToDoSelection = (todo: Todo | null) => {
    dispatch(seletedTodoActions.setSelectedTodo(todo));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                selectFilter={handleFilterSelect}
                search={search}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}
              {todos.length > 0 && (
                <TodoList
                  todos={todos}
                  selectToDo={handleToDoSelection}
                  // selectedTodoID={selectedTodo?.id || 0}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null
      && (
        <TodoModal
          selectedToDo={selectedTodo}
          unselectToDo={handleToDoSelection}
        />
      )}
    </>
  );
};
