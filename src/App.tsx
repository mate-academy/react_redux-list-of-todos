import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hook';

export const App = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);

  //UseEffect
  //UseEffect
  //UseEffect
  //UseEffect

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
        }, 1500); // Затримка перед оновленням state
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="app">
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
    </div>
  );
};
