import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Status } from './types/Status';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const query = useSelector<RootState, string>(state => state.filter.query);
  const status = useSelector<RootState, Status>(state => state.filter.status);
  const visibleTodos = useSelector<RootState, [] | Todo[]>(
    state => state.todos.todos,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = visibleTodos
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
        case 'all':
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

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
              {loading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
