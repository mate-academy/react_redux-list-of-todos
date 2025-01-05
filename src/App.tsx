import { useEffect, useState } from 'react';
import { useAppSelector } from './app/hooks';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { filterTodos } from './services/service';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const todos = useAppSelector(state => state.todos.todos);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = filterTodos(todos, filter);

  useEffect(() => {
    if (!!todos.length) {
      setIsLoading(false);
    }
  }, [todos]);

  const selectedTodo = useAppSelector(state => state.currentTodo);

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
              <TodoList filteredTodos={filteredTodos} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
