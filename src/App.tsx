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
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector<Todo[]>(state => state.todos);
  const hasSelectedTodo = useAppSelector(state => state.currentTodo !== null);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => dispatch(
        todosActions.setTodos(todosFromServer),
      ))
      .catch(error => {
        throw new Error(error);
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

            <div className="block">
              {!todos.length ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {hasSelectedTodo && <TodoModal />}
    </>
  );
};
