import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useAppSelector } from './hooks/useAppSelector';
import { load } from './features/todos';
export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoader(true);
        const data = await getTodos();

        dispatch(load(data));
      } catch {
        throw new Error('Error load data');
      } finally {
        setIsLoader(false);
      }
    }

    fetchData();
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

            <div className="block">
              {isLoader && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
