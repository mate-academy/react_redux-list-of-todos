import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { todosSlice } from './features/todos';
import { getTodos } from './api';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todos => {
        dispatch(todosSlice.actions.addTodos(todos));
      })
      .catch()
      .finally(() => setLoading(false));
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

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
