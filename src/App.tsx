import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const todosList = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => dispatch(todosSlice.actions.addTodos(todos)))
      .catch(error => {
        throw error;
      })
      .finally(() => {
        setLoading(false);
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
              {loading && <Loader />}

              {!loading && todosList.length > 0 && (
                <TodoList todos={todosList} selectedTodo={currentTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal selectedTodo={currentTodo} />}
    </>
  );
};
