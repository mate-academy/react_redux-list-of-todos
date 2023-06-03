import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(apiTodos => {
        dispatch(setTodos(apiTodos));
        setIsLoading(true);
      })
      .catch(() => setIsLoading(false));
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
              {todos.length > 0 && isLoading
                ? <TodoList />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} />
      )}
    </>
  );
};
