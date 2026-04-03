import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';

export const App = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(todo => {
        dispatch(setTodos(todo));
      })
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

            <div className="block">{loader ? <Loader /> : <TodoList />} </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
