/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { useAppDispatch, useAppSelector } from './app/store';
import { todosSlice } from './features/todos';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [loader, setLoader] = useState(false);
  const [searchFilter, setSeacrhFilter] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then((data: Todo[]) => dispatch(todosSlice.actions.setTodos(data)))
      .finally(() => setLoader(false));
  }, [dispatch]);

  const visibleTodos = () => {
    let visTodos = [];

    switch (filter) {
      case 'active':
        visTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        visTodos = todos.filter(todo => todo.completed);
        break;

      default:
        return todos;
    }

    return visTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchFilter.toLowerCase()),
    );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setSearchFilter={setSeacrhFilter} />
            </div>

            <div className="block">
              {loader ? <Loader /> : <TodoList todos={visibleTodos()} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
