/* eslint-disable react-hooks/exhaustive-deps */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './hooks';
import { getTodos } from './api';
import { useEffect } from 'react';
import { actions as todosActions } from './features/todos';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(response => dispatch(todosActions.setTodos(response)))
      .catch(() => {
        throw new Error('Please check your internet connection');
      });
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
              {todos.length === 0 ? <Loader /> : <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
