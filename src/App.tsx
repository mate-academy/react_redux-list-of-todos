import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useAppDispatch, useAppSelector } from './app/store';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';
import { useState, useEffect, useMemo } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const preparedTodos = useMemo(() => {
    let newTodos = [];

    switch (filter) {
      case 'active':
        newTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        newTodos = todos.filter(todo => todo.completed);
        break;

      default:
        newTodos = todos;
    }

    return newTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [filter, query, todos]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data: Todo[]) => dispatch(todosSlice.actions.setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQuery={setQuery} />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
