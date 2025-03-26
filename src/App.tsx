import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { Status } from './types/Status';

export const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status) as Status;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTodos();

        dispatch(todosSlice.actions.setTodos(data));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const getSortedTodos = (filterQuery: string, option: Status) => {
    let sortedTodos = [...todos];

    if (filterQuery) {
      const normalizedQuery = filterQuery.toLowerCase();

      sortedTodos = sortedTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    if (option) {
      switch (option) {
        case 'active':
          sortedTodos = sortedTodos.filter(todo => !todo.completed);
          break;
        case 'completed':
          sortedTodos = sortedTodos.filter(todo => todo.completed);
          break;
        case 'all':
        default:
          return sortedTodos;
      }
    }

    return sortedTodos;
  };

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            {isLoading ? (
              <Loader />
            ) : (
              <TodoList todos={getSortedTodos(query, status)} />
            )}
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </div>
  );
};