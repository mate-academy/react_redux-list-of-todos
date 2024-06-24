import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosSlice } from './features/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data: Todo[]) => dispatch(todosSlice.actions.setTodos(data)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const preparedTodos = useMemo(() => {
    let sortedTodos = [];

    switch (filter) {
      case 'active':
        sortedTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        sortedTodos = todos.filter(todo => todo.completed);
        break;

      default:
        sortedTodos = todos;
    }

    return sortedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }, [filter, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setQuery={setQuery} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={preparedTodos} />
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
