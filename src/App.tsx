/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchTodos } from './helper/fetchTodos';
import { selectFilteredTodos } from './helper/selectFilterTodos';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.data);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const filterType = useSelector((state: RootState) => state.filter.filterType);
  const query = useSelector((state: RootState) => state.filter.query);

  const isModalActive = useSelector(
    (state: RootState) => state.currentTodo.isModalActive,
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = useSelector(() =>
    selectFilteredTodos(todos, filterType, query),
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
              {loading && <Loader />}
              {!loading && Boolean(filteredTodos.length) && (
                <TodoList filteredTodos={filteredTodos} />
              )}
              {!loading && Boolean(!filteredTodos.length) && (
                <p className="notification is-warning">
                  There are no todos matching current filter criteria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && <TodoModal />}
    </>
  );
};
