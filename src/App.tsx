import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { selectors } from './store';
import { actions } from './store/loading';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectors.isLoading);

  const [sortType, setSortType] = useState<TodoStatus>(TodoStatus.ALL);

  const loadTodos = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
    setVisibleTodos(loadedTodos);
    dispatch(actions.finishLoading());
  };

  useEffect(() => {
    loadTodos();
    setVisibleTodos(todos);
  }, []);

  const sortTodos = () => {
    let toUpdate = visibleTodos;

    switch (sortType) {
      case (TodoStatus.ACTIVE):
        toUpdate = todos.filter(todo => !todo.completed);
        break;
      case (TodoStatus.COMPLETED):
        toUpdate = todos.filter(todo => todo.completed);
        break;
      default:
        toUpdate = todos;
    }

    if (query) {
      toUpdate = toUpdate
        .filter(todo => todo.title.includes(query.toLowerCase()));
    }

    setVisibleTodos(toUpdate);
  };

  useEffect(() => {
    sortTodos();
  }, [sortType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortType={setSortType}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
