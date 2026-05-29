import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App = () => {
  const selectedModal = useAppSelector(state => state.currentTodo);
  const [loadingError, setLoadingError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(data => {
        dispatch(setTodos(data));
      })
      .catch(fetchError => {
        setLoadingError(fetchError);
      })
      .finally(() => {
        setIsLoading(false);
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>
      {selectedModal !== null ? <TodoModal /> : ''}
    </>
  );
};
