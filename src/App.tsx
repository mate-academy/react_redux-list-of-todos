import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as todosActions } from './features/todos';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const currentTodo = useAppSelector(state => state.current);

  useEffect(() => {
    getTodos()
      .then(data => {
        dispatch(todosActions.setTodos(data));
      })
      .finally(() => setLoader(false));
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
              {loader && <Loader />}
              {!loader && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
