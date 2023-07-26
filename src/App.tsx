import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Status } from './types/Status';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todoActions } from './features/todos';

const getFilteredTodos = (
  todos: Todo[],
  filter: Status,
  query: string,
): Todo[] => {
  let filteredTodos: Todo[] = [];

  switch (filter) {
    case Status.All:
      filteredTodos = todos;
      break;

    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Complited:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default: throw new Error('Wrong todo status');
  }

  if (query) {
    const lowerQuery = query.toLowerCase().trim();

    filteredTodos = filteredTodos.filter(({ title }) => (
      title.toLowerCase().includes(lowerQuery)
    ));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    currentTodo: selectedTodo,
    todos,
    filter,
  } = useAppSelector(state => state);

  const { query, status } = filter;

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loadTodos = async () => {
    setError(false);
    setLoading(true);

    try {
      const todosFromServer = await getTodos();

      dispatch(todoActions.add(todosFromServer));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filteredTodos = getFilteredTodos(todos, status, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                todoStatusFilter={status}
              />
            </div>

            <div className="block">
              {error && 'Error on loading data from server'}

              {!isLoading && !error
                ? (
                  <TodoList
                    todos={filteredTodos}
                  />
                )
                : <Loader /> }
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
        />
      )}
    </>
  );
};
