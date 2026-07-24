import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then(allTodos =>
      dispatch(todosSlice.actions.addTodos(allTodos)),
    );
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
              {todos.length === 0 && <Loader />}
              {todos.length > 0 && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
