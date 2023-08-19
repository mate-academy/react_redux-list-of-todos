/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [emptyMassive, setEmptyMassive] = useState<boolean>(false);

  const todos: Todo[] = useAppSelector(state => state.todos);
  const setTodos = (newTodos: Todo[]) => dispatch(todosActions.setTodos(newTodos));

  const fetchTodos = () => {
    setLoading(true);

    getTodos()
      .then((newTodos) => {
        if (newTodos.length) {
          setTodos(newTodos);
          setEmptyMassive(false);
        } else {
          setEmptyMassive(true);
        }
      })
      .catch()
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const formattedQuery = useAppSelector(state => (
    state.filter.query.trim().toLowerCase()));

  const status = useAppSelector(state => state.filter.status);

  const filter = (type: string) => {
    const findQuery = (queryToSearch: string, filteredTodos: Todo[]) => {
      return filteredTodos.filter((todo) => (
        todo.title.toLowerCase().includes(queryToSearch)
      ));
    };

    switch (type) {
      case Status.ALL:
        return findQuery(formattedQuery, todos);

      case Status.ACTIVE: {
        const activeTodos = todos.filter((todo) => !todo.completed);

        return findQuery(formattedQuery, activeTodos);
      }

      case Status.COMPLETED: {
        const completedTodos = todos.filter((todo) => todo.completed);

        return findQuery(formattedQuery, completedTodos);
      }

      default: return todos;
    }
  };

  const filteredTodos = useMemo(() => {
    return filter(status);
  }, [status, todos, formattedQuery]);

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
              { loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  emptyMassive={emptyMassive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (<TodoModal />)}
    </>
  );
};
