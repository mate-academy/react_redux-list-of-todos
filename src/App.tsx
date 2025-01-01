/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { loadTodos, setError, setLoading } from './features/todos';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';

export const App: React.FC = () => {
  const selectedTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );

  const { loading } = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();

  const handleGetTodos = () => {
    dispatch(setLoading(true));

    getTodos()
      .then(res => {
        dispatch(loadTodos(res));
      })
      .catch(() => dispatch(setError('Something went wrong')))
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(handleGetTodos, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} />}
    </>
  );
};
