import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './features/hooks';

export const App = () => {
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsTodosLoaded(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(todosSlice.actions.setTodos(todosFromServer));
      })
      .finally(() => setIsTodosLoaded(false));
  }, [dispatch]);

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
