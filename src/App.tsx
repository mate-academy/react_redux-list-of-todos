import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { getTodos } from './api';
import {
  setTodos,
  setLoading as loadingTodos,
  setError as todosLoadError,
} from './features/todos';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(loadingTodos(true));
    getTodos()
      .then(todosFromServer => {
        dispatch(setTodos(todosFromServer));
      })
      .catch(() => dispatch(todosLoadError('Something went wrong')))
      .finally(() => dispatch(loadingTodos(false)));
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
              {loading && <Loader />}

              {error && (<p>{error}</p>)}

              {!loading && todos && !error && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
