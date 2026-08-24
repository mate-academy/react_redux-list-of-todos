import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { AppDispatch } from './app/store';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromApi => {
        dispatch(setTodos(todosFromApi));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">{loading ? <Loader /> : <TodoList />}</div>
        </div>
      </div>

      <TodoModal />
    </div>
  );
};

export default App;
