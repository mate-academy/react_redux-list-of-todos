import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelected } from './app/hooks';

export const App = () => {
  const dispatch = useDispatch();
  const todo = useAppSelected(state => state.todos);

  useEffect(() => {
    getTodos().then(todos => {
      dispatch(setTodos(todos));
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

            <div className="block">
              {!todo.length ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
