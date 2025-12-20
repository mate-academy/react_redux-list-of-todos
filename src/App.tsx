import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(todos => dispatch(todosSlice.actions.setTodos(todos)))
      .finally(() => setLoader(false));
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

            <div className="block">{loader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
