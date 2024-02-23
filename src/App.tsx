import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const filterState = useAppSelector(state => state.filterR);
  const query = useAppSelector(state => state.queryR);

  useEffect(() => {
    (() => {
      setIsLoading(true);
      setTimeout(async () => {
        const allTodos = await getTodos();

        setTodos(allTodos);
        setIsLoading(false);
      }, 1000);
    })();
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filterState) {
      case 'all':
        return todos.filter(todo => todo.title.includes(query));
      case 'active':
        return todos.filter(todo => {
          return !todo.completed && todo.title.includes(query);
        });
      case 'completed':
        return todos.filter(todo => {
          return todo.completed && todo.title.includes(query);
        });
      default:
        return todos;
    }
  }, [filterState, query, todos]);

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
              {!isLoading && <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>
      <TodoModal />
    </>
  );
};
