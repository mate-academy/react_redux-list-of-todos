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
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((fetchedTodos) => {
        setLoading(false);
        setTodos(fetchedTodos);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
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
              {loading ? <Loader /> : <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (<TodoModal />)}
    </>
  );
};
