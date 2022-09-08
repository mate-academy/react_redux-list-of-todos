/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { actions as todoActions} from './features/currentTodo';
import { actions as todosAction } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { RootState } from './app/store';
// import { Status } from './types/Status';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector((state: RootState) => {
    if (state.filter.status === 'active') {
      return state.todos.filter((t: Todo) => (t.title.toLowerCase()
        .includes(state.filter.query.toLowerCase())) && t.completed === false);
    }

    if (state.filter.status === 'completed') {
      return state.todos.filter((t: Todo) => (t.title.toLowerCase()
        .includes(state.filter.query.toLowerCase())) && t.completed === true);
    }

    return state.todos.filter((t: Todo) => t.title.toLowerCase()
      .includes(state.filter.query.toLowerCase()));
  });

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

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
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    currentTodo={currentTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} />
      )}
    </>
  );
};
