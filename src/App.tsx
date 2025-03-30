/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

function getFiltredTodos(filter: Filter, query: string, todos: Todo[]): Todo[] {
  const newTodos = todos.filter(todo =>
    todo.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
  );

  switch (filter) {
    case Filter.All:
      return newTodos;
    case Filter.Completed:
      return newTodos.filter(todo => todo.completed);
    case Filter.Active:
      return newTodos.filter(todo => !todo.completed);
  }
}

export const App: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const filter = useAppSelector(state => state.filter);

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    getTodos().then(todosFromServer => {
      dispatch(todosSlice.actions.setTodos([...todosFromServer]));
      setIsLoad(false);
    });
  }, []);

  const filtredTodos: Todo[] = getFiltredTodos(
    filter.status,
    filter.query,
    todos,
  );

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
              {isLoad && <Loader />}
              {!isLoad && <TodoList todos={filtredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
