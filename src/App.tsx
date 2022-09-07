/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TODO_ACTIONS } from './features/todos';
import { FILTER_SELECTOR, CURRENT_TODO_SELECT, TODOS_SELECTOR } from './features/selectors';
import { filredByQuery, filtredByComleted } from './app/filterHelper';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispach = useDispatch();

  const todos = useSelector(TODOS_SELECTOR.todos);

  const selectTodo = useSelector(CURRENT_TODO_SELECT.currentTodo);

  const { status, query } = useSelector(FILTER_SELECTOR.filter);

  const filteredArray = useMemo(() => {
    const filteredBySelect = filtredByComleted(status, todos);

    return filredByQuery(query, filteredBySelect);
  }, [status, query, todos]);

  useEffect(() => {
    setIsLoaded(false);
    getTodos()
      .then(todosData => {
        if (todosData && todosData.length) {
          dispach(TODO_ACTIONS.set(todosData));
          setIsLoaded(true);
        }
      });
  }, []);

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
              {!isLoaded
                ? <Loader />
                : (
                  <TodoList filteredTodos={filteredArray} />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && <TodoModal selectTodo={selectTodo} /> }
    </>
  );
};
