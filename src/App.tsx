/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';
import { selectors } from './store';
import { loadActions } from './store/loading';
import { todoActions } from './store/сurrentTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>(Filter.ALL);
  const [savedTodo, setSavedTodo] = useState<Todo>();

  const dispatch = useDispatch();
  const isTodoLoading = useSelector(selectors.isLoading);
  const modalIsOpened = useSelector(selectors.getTodo);

  useEffect(() => {
    getTodos().then(todoList => {
      setTodos(todoList);
      setVisibleTodos(todoList);
      dispatch(loadActions.startLoading());
    });
  }, []);

  const searchByWord = (title: string) => {
    const params = query.toLowerCase();

    return title.toLocaleLowerCase().includes(params);
  };

  useEffect(() => {
    switch (filter) {
      case Filter.ALL:
        setVisibleTodos(todos.filter(todo => searchByWord(todo.title)));
        break;

      case Filter.ACTIVE:
        setVisibleTodos(todos.filter(todo => !todo.completed && searchByWord(todo.title)));
        break;

      case Filter.COMPLITED:
        setVisibleTodos(todos.filter(todo => todo.completed && searchByWord(todo.title)));
        break;
      default:
        break;
    }
  }, [query, filter]);

  const todoOpener = (todo: Todo) => {
    setSavedTodo(todo);
    dispatch(todoActions.todoSelect(todo));
  };

  const getQuery = (userQuery: string) => {
    setQuery(userQuery);
  };

  const selectedFilter = (userFilter: string) => {
    setFilter(userFilter);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                getQuery={getQuery}
                selectedFilter={selectedFilter}
              />
            </div>

            <div className="block">
              {!isTodoLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    todoOpener={todoOpener}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpened
      && savedTodo
      && (
        <TodoModal />
      )}
    </>
  );
};
