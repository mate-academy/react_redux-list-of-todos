import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsTodosLoaded(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.setTodos(todosFromServer));
      })
      .finally(() => setIsTodosLoaded(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (status === 'completed') {
      if (todo.completed === false) {
        return false;
      }
    } else if (status === 'active') {
      if (todo.completed === true) {
        return false;
      }
    }

    if (!todo.title.toLowerCase().trim().includes(query.toLowerCase().trim())) {
      return false;
    }

    return true;
  });

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
              <Loader isLoaded={isTodosLoaded} />
              <TodoList isTodosLoaded={isTodosLoaded} todos={visibleTodos} />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
