import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { setTodos } from './features/todos';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useAppSelector } from './hooks/redux';

export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      // eslint-disable-next-line max-len
      'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
    )
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          dispatch(setTodos(data));
          setIsLoading(false);
        }, 1500);
      })
      .catch(() => {
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
