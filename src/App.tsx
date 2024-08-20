import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './api';
import { actions } from './features/todos';
import { RootState } from './app/store';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => {
        dispatch(actions.setTodos(todosFromServer));
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
