import { useAppDispatch, useAppSelector } from './app/hooks';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { filterTodos } from './services/service';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';
import { fetchTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const isLoading = useAppSelector(state => state.todos.loading);
  const filter = useAppSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = filterTodos(todos, filter);

  const selectedTodo = useAppSelector(state => state.currentTodo);

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
              {isLoading && <Loader />}
              <TodoList filteredTodos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
