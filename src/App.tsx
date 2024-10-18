import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { addTodos } from './features/todos';
import { filterTodos } from './features/filterTodos';

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const todos = useAppSelector(state => state.todos.value);
  const currTodo = useAppSelector(state => state.currTodo.value);
  const filterStatus = useAppSelector(state => state.filterTodos.select);
  const filterQuery = useAppSelector(state => state.filterTodos.query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(todosFromServer => dispatch(addTodos(todosFromServer)))
      .finally(() => setIsLoading(false));
  });

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filterStatus, filterQuery);
  }, [todos, filterStatus, filterQuery]);

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

      {currTodo && <TodoModal />}
    </>
  );
};
