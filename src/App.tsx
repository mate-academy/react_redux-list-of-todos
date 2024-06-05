/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { useAppSelector } from './app/hooks';
import { setTodos } from './features/todos';

export const App: FC = () => {
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const hasTodos = useAppSelector(state => state.todos.length > 0);
  const activeTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(() => setErrorMessage(true));
  }, [dispatch]);

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
            <div className="block">
              {!hasTodos && !errorMessage && <Loader />}
              {!hasTodos && errorMessage && <p>There is something wrong!</p>}

              {hasTodos && (
                <>
                  <h1 className="title">Todos:</h1>
                  <TodoFilter />
                  <TodoList filteredTodos={filteredTodos} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {activeTodo && <TodoModal />}
    </>
  );
};
