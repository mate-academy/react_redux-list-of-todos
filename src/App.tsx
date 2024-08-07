import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { selector } from './app/store';

export const App = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const currentTodo = selector(state => state.currentTodo);

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .finally(() => setLoader(false));

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

            <div className="block">
              {loader && <Loader />}
              {!loader && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
