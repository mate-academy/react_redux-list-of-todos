import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const [isLoading, setIsloading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsloading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(() => {})
      .finally(() => {
        setIsloading(false);
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo !== null && <TodoModal />}
    </>
  );
};
