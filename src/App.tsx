import { useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';

import { getTodos, getUser } from './api';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { setTodos } from './features/todos';
import { setCurrentTodo } from './features/currentTodo';

import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);

  const { query, status } = useAppSelector(state => state.filter);

  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoadingTodos(true);

    getTodos()
      .then(result => {
        dispatch(setTodos(result));
      })
      .finally(() => {
        setIsLoadingTodos(false);
      });
  }, [dispatch]);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (status === 'active') {
          return !todo.completed;
        }

        if (status === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
  }, [todos, status, query]);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));

    setSelectedUser(null);
    setIsLoadingUser(true);

    getUser(todo.userId)
      .then(result => {
        setSelectedUser(result);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  };

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
    setSelectedUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            {isLoadingTodos ? (
              <Loader />
            ) : (
              <TodoList
                todos={visibleTodos}
                selectedTodoId={currentTodo?.id ?? null}
                onSelect={handleSelectTodo}
              />
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          todo={currentTodo}
          user={selectedUser}
          isLoading={isLoadingUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
