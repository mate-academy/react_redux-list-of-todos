import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos } from './api';
import { getUser } from './api';
import { actions as todosActions } from './features/todos';
import { setStatus, setQuery, clearQuery } from './features/filter';
import { setCurrentTodo, clearCurrentTodo } from './features/currentTodo';

import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const todos: Todo[] = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(data => {
        dispatch(todosActions.setTodos(data));
      })
      .finally(() => setLoadingTodos(false));
  }, [dispatch]);

  useEffect(() => {
    if (selectedTodo) {
      setLoadingUser(true);
      getUser(selectedTodo.userId)
        .then(setUser)
        .finally(() => setLoadingUser(false));
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [selectedTodo]);

  const filteredTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }

    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                searchQuery={query}
                onStatusChange={newStatus => dispatch(setStatus(newStatus))}
                onSearchChange={newQuery => dispatch(setQuery(newQuery))}
                onClearSearch={() => dispatch(clearQuery())}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelectTodo={todo => dispatch(setCurrentTodo(todo))}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        onClose={() => dispatch(clearCurrentTodo())}
        user={user}
        loading={loadingUser}
      />
    </>
  );
};
