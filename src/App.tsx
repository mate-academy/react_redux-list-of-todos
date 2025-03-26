/* eslint-disable */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [filterMode, setFilterMode] = useState('all');
  // const [searchInput, setSearchInput] = useState('');

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((todosFromServer: Todo[]) => {
        dispatch(setTodos(todosFromServer));
      })
      .finally(() => setIsLoading(false));
    }, [dispatch]);

    const filteredTodos = todos.filter(todo => {
      const matchesFilter =
        filter.status === 'all' ||
        (filter.status === 'active' && !todo.completed) ||
        (filter.status === 'completed' && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(filter.query.toLowerCase());
        return matchesFilter && matchesSearch;
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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && <TodoModal />}
    </>
  );
};
