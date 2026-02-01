import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(res => {
        dispatch(todosSlice.actions.dataDownloaded(res));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = [...todos]
    .filter(todo => {
      switch (status) {
        case 'completed':
          return todo.completed === true;
        case 'active':
          return todo.completed === false;
        case 'all':
          return todo;
        default:
          return;
      }
    })
    .filter(todo => {
      if (todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
        return todo;
      }
    });

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
              {todos.length !== 0 && <TodoList todos={visibleTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
