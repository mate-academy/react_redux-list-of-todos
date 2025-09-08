import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App = () => {
  const dispatch = useAppDispatch();

  // Читаем состояние из Redux через кастомные хуки
  const todos = useAppSelector(state => state.todos.todos);
  const loaded = useAppSelector(state => state.todos.loaded);
  const hasError = useAppSelector(state => state.todos.hasError);
  const selectedTodo = useAppSelector(state => state.currentTodo.selectedTodo);

  // Загружаем todos при монтировании без thunk
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => dispatch(setTodos(data)));
    // .catch(() => dispatch(setError()));
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
              {!loaded && <Loader />}
              {hasError && <p>Error loading todos!</p>}
              {todos.length > 0 && !hasError && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
