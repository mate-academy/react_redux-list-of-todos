import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { RootState, AppDispatch } from './app/store';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    getTodos().then(data => dispatch(setTodos(data)));
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
              {!todos.length && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
