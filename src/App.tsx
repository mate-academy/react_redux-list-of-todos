/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';
import { User } from './types/User';
import { setTodos } from './features/todos';
import { actions } from './features/currentTodo';

export const App: FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const activeTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setLoadingModal(true);

    if (userId === null) {
      return;
    }

    getUser(userId)
      .then(setUser)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoadingModal(false));
  }, [dispatch, userId]);

  const currentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
    setUserId(todo.id);
  };

  const filteredTodos = useAppSelector(({ filter, todos }) => {
    if (filter.status === 'all' && !filter.query) {
      return todos;
    }

    const lowerQuery = filter.query.toLocaleLowerCase();

    return todos.filter(todo => {
      if (filter.status === 'active' && todo.completed) {
        return false;
      }

      if (filter.status === 'completed' && !todo.completed) {
        return false;
      }

      return todo.title.toLocaleLowerCase().includes(lowerQuery);
    });
  });

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
              {loading && !errorMessage && <Loader />}
              {errorMessage && <p>There is something wrong!</p>}

              {!loading && !errorMessage && (
                <TodoList
                  currentTodo={currentTodo}
                  filteredTodos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && !errorMessage && user && (
        <TodoModal loadingModal={loadingModal} user={user} />
      )}
    </>
  );
};
