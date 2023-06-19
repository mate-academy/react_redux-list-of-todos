import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as TodosActions } from './features/todos';
import { getFilteredTodos } from './utils/helpers/filterTodos';

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const fetchedTodos = await getTodos();

        dispatch(TodosActions.addTodos(fetchedTodos));
      } catch {
        window.console.log('error message');
      } finally {
        setIsLoaded(true);
      }
    };

    fetchTodo();
  }, []);

  const filteredTodos = getFilteredTodos(todos, filter);

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
              {isLoaded ? (
                <TodoList todos={filteredTodos} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
