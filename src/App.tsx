/* eslint-disable max-len */
import { FC, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodosAction } from './features/todos';

import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';

export const App: FC = () => {
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(data => dispatch(setTodosAction(data)));
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
              {todos.length > 0
                ? <TodoList />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo
        && <TodoModal />}
    </>
  );
};
