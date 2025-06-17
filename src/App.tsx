import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { getTodos } from './api';
import { loadTodos } from './features/todos';
import { Status } from './types/Status';
import getFilteredTodos from './helpers/getFilteredTodos';

export const App = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => {
    return state.filter.status as Status;
  });
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos().then(todosFromServer => dispatch(loadTodos(todosFromServer)));
  }, [dispatch]);

  const filteredTodos = getFilteredTodos(todos, { query, status });

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
              {todos.length > 0 && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {Boolean(currentTodo) && <TodoModal />}
    </>
  );
};
