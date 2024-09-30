import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api';
import { addTodos } from './features/todos';

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
  }, []);

  const filterTodos = useMemo(() => {
    let newTodos = [...todos];

    if (filterStatus) {
      newTodos = newTodos.filter(item => {
        switch (filterStatus) {
          case 'active':
            return item.completed === false;
          case 'completed':
            return item.completed;
          case 'all':
          default:
            return true;
        }
      });
    }

    if (filterQuery) {
      newTodos = newTodos.filter(item => {
        return item.title.toLowerCase().includes(filterQuery.toLowerCase());
      });
    }

    return newTodos;
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
              {isLoading ? <Loader /> : <TodoList todos={filterTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currTodo && <TodoModal />}
    </>
  );
};
