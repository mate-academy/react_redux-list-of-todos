import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer =>
        dispatch(todosSlice.actions.setTodos(todosFromServer)),
      )
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = todos.filter(todo => {
    if (filter.status === 'completed' && !todo.completed) {
      return false;
    }

    if (filter.status === 'active' && todo.completed) {
      return false;
    }

    if (
      filter.query &&
      !todo.title.toLowerCase().includes(filter.query.toLowerCase())
    ) {
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
              {isLoading && <Loader />}
              {!isLoading && <TodoList filteredTodos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
