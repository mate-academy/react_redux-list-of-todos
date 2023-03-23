import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

const filterTodos = (
  todos: Todo[],
  filter: { query: string, status: Status },
): Todo[] => {
  let filteredTodos = [...todos];

  const { query, status } = filter;

  switch (status) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  if (query) {
    const lowerCasedQuery = query.toLowerCase();

    filteredTodos = filteredTodos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(lowerCasedQuery));
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [isLoaded, setLoaded] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(todosActions.setTodos(todosFromServer));
      } finally {
        setLoaded(true);
      }
    };

    getTodosFromServer();
  }, []);

  const filteredTodos = filterTodos(todos, filter);

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
                : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} />
      )}
    </>
  );
};
