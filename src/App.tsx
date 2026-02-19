import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
// import { useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  // const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    getTodos()
      .then(data => {
        dispatch(todosSlice.actions.setTodos(data));
        setIsLoaded(true);
      })
      .catch(() => {});
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
              {!isLoaded && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
