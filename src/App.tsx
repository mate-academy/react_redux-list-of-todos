import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(setTodos)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('Somethimg went wrong', e);
      })
      .finally(() => setIsLoading(false));
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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                />
              )}
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
