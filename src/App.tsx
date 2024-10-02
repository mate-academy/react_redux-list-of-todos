import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useEffect, useState } from 'react';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';

import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const filter = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((data: Todo[]) => {
        dispatch(todosSlice.actions.setTodos(data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

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
              {!loading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
