import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/store';
import { setTodos } from './features/todos';

export const App = () => {
  const [listLoading, setListLoading] = useState(false);
  const dispatch = useDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setListLoading(true);
    getTodos()
      .then(array => {
        dispatch(setTodos(array));
      })
      .finally(() => setListLoading(false));
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
              {listLoading ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
