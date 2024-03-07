import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoFilter } from './components/TodoFilter';
import { filterTodos } from './utils/filterTodos';
import { TodoList } from './components/TodoList';
import { Loader } from './components/Loader/Loader';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo, todos, filter } = useAppSelector(state => state);
  const { status, query } = filter;

  useEffect(() => {
    getTodos()
      .then(serverTodos => dispatch(todosActions.setTodos(serverTodos)));
  });

  const filteredTodos = useMemo(
    () => filterTodos(todos, { query, status }),
    [todos, query, status],
  );

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
              {!!todos.length && (
                filteredTodos.length
                  ? <TodoList todos={filteredTodos} />
                  : (
                    <p className="notification is-warning">
                      There are no todos matching current filter criteria
                    </p>
                  )
              )}
              {!todos.length && <Loader />}
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && (<TodoModal currentTodo={currentTodo} />)}
    </>
  );
};
