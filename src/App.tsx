import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { todosSlice } from './features/todos';
import { filterSlice } from './features/filter';
import { currentTodoSlice } from './features/currentTodo';
import { currentUserSlice } from './features/user';
import { User } from './types/User';

export const App = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const todos = useAppSelector<Todo[] | null>(state => state.todos);
  const todo = useAppSelector<Todo | null>(state => state.todo);
  const user = useAppSelector<User | null>(state => state.user);
  const filter = useAppSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        dispatch(todosSlice.actions.setTodos(data));
      })
      .catch(() => setErrorMessage('Problem with todos'))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (todo) {
      setIsLoadingUser(true);
      getUser(todo.userId)
        .then(data => {
          dispatch(currentUserSlice.actions.setUser(data));
        })
        .finally(() => setIsLoadingUser(false));
    } else {
      dispatch(currentUserSlice.actions.setUser(null));
    }
  }, [todo]);

  const handlerSetTodo = (currentTodo: Todo | null) => {
    dispatch(currentTodoSlice.actions.setTodo(currentTodo));
  };

  const handlerSetFilter = (filer: string, search: string) => {
    dispatch(filterSlice.actions.setStatus(filer));
    dispatch(filterSlice.actions.setQuery(search));
  };

  const filteredTodos = useMemo(() => {
    if (!todos) {
      return;
    }

    return todos
      .filter(filterTodo => {
        switch (filter.status) {
          case 'active':
            return !filterTodo.completed;
          case 'completed':
            return filterTodo.completed;
          default:
            return true;
        }
      })
      .filter(filterTodo => {
        return filterTodo.title
          .toLowerCase()
          .includes(filter.query.toLowerCase());
      });
  }, [todos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handlerSetFilter={handlerSetFilter} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setTodo={handlerSetTodo}
                  currentTodo={todo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && !errorMessage && (
        <TodoModal
          todo={todo}
          setTodo={handlerSetTodo}
          user={user}
          isLoadingUser={isLoadingUser}
        />
      )}
    </>
  );
};
