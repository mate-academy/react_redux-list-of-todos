import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currnetTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer =>
        dispatch(todosSlice.actions.loadTodos(todosFromServer)),
      )
      .finally(() => setIsLoading(false));
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
              {isLoading && <Loader />}

              {!isLoading && !!todos.length && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currnetTodo && <TodoModal />}
    </>
  );
};
