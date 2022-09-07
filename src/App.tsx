/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { actions as todoActions} from './features/currentTodo';
import { actions as todosAction } from './features/todos';
import { getTodos } from './api';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(todosFromServer => dispatch(todosAction.setTodos(todosFromServer)));
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
              {/* <Loader /> */}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
