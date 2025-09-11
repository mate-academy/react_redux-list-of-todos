import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await getTodos();
        dispatch(setTodos(data));
      } catch (error) {
        setErrorMessage('Failed to fetch');
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
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {errorMessage && <p className="has-danger">{errorMessage}</p>}
              {!isLoading && !errorMessage && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
