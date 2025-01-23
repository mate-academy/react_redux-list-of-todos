/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList, TodoFilter, TodoModal, Loader } from './components';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { todosSlice } from './features/todos';
import { Filter } from './types/Filter';

function getFilteredTodos(todos: Todo[], query: string, filterOption: Status) {
  const filteredTodos = todos
    .filter(todo => {
      switch (filterOption) {
        case 'all':
          return true;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return filteredTodos;
}

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector<RootState>(
    state => state.currentTodo,
  ) as Todo;
  const todos = useSelector<RootState>(state => state.todos) as Todo[];
  const { query, status } = useSelector<RootState>(
    state => state.filter,
  ) as Filter;
  const [isLoading, setIsLoading] = useState(false);

  const setTodos = (todosData: Todo[]) => {
    dispatch(todosSlice.actions.setTodos(todosData));
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = getFilteredTodos(todos, query, status);

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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {!isLoading && selectedTodo && <TodoModal />}
    </>
  );
};
