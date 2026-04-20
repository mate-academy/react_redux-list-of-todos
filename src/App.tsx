import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { ModalProvider } from './components/ModalContext';
import { setTodos } from './features/todos';
import { setCurrentTodo } from './features/currentTodo';
import { setQuery } from './features/filter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const todoForSelectUser = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorUserMessage, setErrorUserMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(newData => dispatch(setTodos(newData)))
      .catch(error =>
        setErrorMessage(new Error(`todo data loading error: ${error}`).message),
      )
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      if (errorMessage) {
        setErrorMessage('');
      } else if (errorUserMessage) {
        setErrorUserMessage('');
      }
    }, 5000);

    return () => clearTimeout(idTimeout);
  }, [errorMessage, errorUserMessage]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const onClearSearch = () => dispatch(setQuery(''));

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    switch (status) {
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (query.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  }, [status, todos, query]);

  const onOpenModal = (userId: number, todo: Todo) => {
    getUser(userId)
      .then(userData => setUser(userData))
      .catch(error =>
        setErrorUserMessage(
          new Error(`User data loading error: ${error}`).message,
        ),
      );
    dispatch(setCurrentTodo(todo));
  };

  const onCloseModal = () => {
    dispatch(setCurrentTodo(null));
    setUser(null);
  };

  return (
    <Provider store={store}>
      <ModalProvider>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  onChangeInput={onChangeInput}
                  onClearSearch={onClearSearch}
                  valueInput={query}
                />
              </div>

              <div className="block">
                {isLoading ? (
                  <Loader />
                ) : errorMessage ? (
                  <div data-cy="error">{errorMessage}</div>
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    onOpenModal={onOpenModal}
                    errorUser={errorUserMessage}
                  />
                )}
                {/* {isLoading && <Loader />}
              {errorMessage || (
                <TodoList
                  todos={filteredTodos}
                  onOpenModal={onOpenModal}
                  errorUser={errorUserMessage}
                />
              )} */}
              </div>
            </div>
          </div>
        </div>

        {errorUserMessage ? (
          <div>User data loading error, please reload peage</div>
        ) : (
          todoForSelectUser && (
            <TodoModal
              user={user}
              todo={todoForSelectUser}
              onCloseModal={onCloseModal}
            />
          )
        )}
      </ModalProvider>
    </Provider>
  );
};
