import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

export const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(todosActions.setLoading(true));
    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
      })
      .catch(() => {
        dispatch(todosActions.setError('Error'));
      })
      .finally(() => {
        dispatch(todosActions.setLoading(false));
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal currentTodo={currentTodo} />}
    </>
  );
};
