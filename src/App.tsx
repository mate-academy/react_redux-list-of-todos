import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);

  const getTodosFromServer = async () => {
    const todosList = await getTodos();

    dispatch(todosActions.setTodos(todosList));
  };

  useEffect(() => {
    getTodosFromServer();
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
              {todos
                ? <TodoList />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal />
      )}
    </>
  );
};
