import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    getTodos()
      .then(response => {
        dispatch(setTodos(response));
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

      {currentTodo && <TodoModal />}
    </>
  );
};
