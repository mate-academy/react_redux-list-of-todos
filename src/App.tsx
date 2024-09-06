import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>
      {currentUser && <TodoModal todo={currentUser} />}
    </>
  );
};
