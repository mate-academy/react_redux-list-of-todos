import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(response => {
        dispatch(todosSlice.actions.setTodos(response));
      })
      .finally(() => {
        setIsLoading(false);
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

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
