/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const todos = useAppSelector(store => store.todos);
  const { status, query } = useAppSelector(store => store.filter);
  const selectedTodo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();

  const addTodos = (todosToAdd: Todo[]) =>
    dispatch(todosActions.addTodos(todosToAdd));

  const filterTodos = () => {
    const filteredByStatus = [...todos].filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });

    return filteredByStatus.filter(todo => {
      const queryLowerCase = query.toLowerCase();
      const todoLowerCase = todo.title.toLowerCase();

      return todoLowerCase.includes(queryLowerCase);
    });
  };

  const todosToRender = filterTodos();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(addTodos)
      .finally(() => setLoading(false));
  }, []);

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
              {loading && <Loader />}
              <TodoList todos={todosToRender} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
