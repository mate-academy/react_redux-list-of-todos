import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { useEffect } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { setTodos } = todosSlice.actions;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => dispatch(setTodos(response)))
      .finally(() => setIsLoading(false));
  }, [setTodos, dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
