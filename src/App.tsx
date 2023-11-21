import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions } from './features/todos';
import { getTodos } from './api';
import { filterTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentTodo, todos, filter } = useAppSelector(
    state => state,
  );
  const dispatch = useAppDispatch();
  const filteredTodos = filterTodos(todos, filter);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await getTodos();

        dispatch(actions.addTodos(response));
      } catch (err) {
        throw new Error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setIsTodosLoading={setIsLoading} />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
