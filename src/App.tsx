import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todosFromServer = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const todosStatus = useAppSelector(state => state.filter.status);
  const todoModal = useAppSelector(state => state.currentTodo);

  const filteredTodos = useMemo(() => {
    return todosFromServer.filter(todo => {
      const todoWithQuery = todo.title.trim().toLowerCase()
        .includes(query.trim().toLowerCase());

      switch (todosStatus) {
        case Status.Active:
          return todoWithQuery && !todo.completed;

        case Status.Completed:
          return todoWithQuery && todo.completed;

        default:
          return todoWithQuery;
      }
    });
  }, [todosFromServer, query, todosStatus]);

  useEffect(() => {
    getTodos()
      .then(allTodos => {
        dispatch(todosActions.add(allTodos));
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
              {!todosFromServer.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={todoModal}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {todoModal && (
        <TodoModal todo={todoModal} />
      )}
    </>
  );
};
