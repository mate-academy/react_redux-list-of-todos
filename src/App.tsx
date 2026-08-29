import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { useDispatch } from 'react-redux';

export const App = () => {
  const currentTodos = useAppSelector(state => state.currentTodos);
  const [loading, setLoading] = useState(true);
  const dispach = useDispatch();

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => dispach(todosActions.setTodos(todos)))
      .finally(() => {
        setLoading(false);
      });
  }, [dispach]);

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

      {currentTodos && <TodoModal />}
    </>
  );
};
