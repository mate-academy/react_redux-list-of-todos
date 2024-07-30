import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .finally(() => setIsLoading(false));

    dispatch(setTodos([]));
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

      {currentTodo && <TodoModal />}
    </>
  );
};
