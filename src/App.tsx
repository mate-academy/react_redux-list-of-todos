import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import {
  TodoList,
  TodoFilter,
  TodoModal,
  Loader,
} from './components';
import { getFilteredTodos } from './helpers/getFilteredTodos';
import { Todo, TodoStatus } from './types';
import { getTodos } from './api';
import { TodoContext } from './TodoContext';

export const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [filterByCategory, setFilterByCategory] = useState(TodoStatus.All);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const visibleTodos = useMemo(() => getFilteredTodos(
    filterByCategory,
    query,
    todoItems,
  ), [query, filterByCategory, todoItems]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodoItems)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const { selectedTodo } = useContext(TodoContext);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectCategory={setFilterByCategory}
                filter={filterByCategory}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
