/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [startTodos, setStartTodos] = useState<Todo[]>([]);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    getTodos()
      .then(todosList => {
        setStartTodos(todosList);
        dispatch(todosActions.setTodos(todosList));
      })
      .finally(() => setPageLoading(false));
  }, []);

  useEffect(() => {
    switch (filter.status) {
      case Filter.ACTIVE:
        dispatch(todosActions.setTodos(startTodos.filter(todo => !todo.completed
          && todo.title.toLowerCase().includes(filter.query.toLowerCase()))));
        break;

      case Filter.COMPLETED:
        dispatch(todosActions.setTodos(startTodos.filter(todo => todo.completed
          && todo.title.toLowerCase().includes(filter.query.toLowerCase()))));
        break;

      default:
        dispatch(todosActions.setTodos(startTodos.filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()))));
    }
  }, [filter]);

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
              {pageLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={todos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
