import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hook';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then((todo: Todo[]) => {
        dispatch(todosActions.addTodos(todo));
      })
      .finally(() => setLoader(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTodos = [...todos].filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);
    const matchesFilter = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesStatus && matchesFilter;
  });

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
              {loader && <Loader />}
              {filteredTodos.length !== 0 && !loader && (
                <TodoList todos={filteredTodos} />
              )}
              {filteredTodos.length === 0 && !loader && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
