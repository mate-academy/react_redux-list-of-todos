import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FC, useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { getFilteredData } from './utils/getFilteredData';
import { useAppDispatch, useAppSelector } from './app/hook';
import { todosSlice } from './features/todos';

export const App: FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const openedTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(res => dispatch(todosSlice.actions.setTodos(res)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const query = useAppSelector(state => state.filter.query);
  const selectedCondition = useAppSelector(state => state.filter.status);

  const filteredData = getFilteredData(todos, { query, selectedCondition });

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
              {loading && <Loader />}

              {!loading && todos.length > 0 && (
                <TodoList todos={filteredData} />
              )}
            </div>
          </div>
        </div>
      </div>

      {openedTodo && <TodoModal />}
    </>
  );
};
