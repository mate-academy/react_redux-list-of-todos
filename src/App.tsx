import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import { selectedTodo } from './features/currentTodo';

export const App = () => {
  const dispatch = useDispatch();
  const todoModal = useSelector(selectedTodo);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
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
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {todoModal && <TodoModal />}
    </>
  );
};
