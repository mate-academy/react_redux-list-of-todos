/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { getPreparedTodos } from './utils/getPreparedTodos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const {
    todos,
    currentTodo,
    filter,
  } = useAppSelector(state => state);

  const changeLoading = () => {
    setLoading(currentLoading => !currentLoading);
  };

  useEffect(() => {
    changeLoading();

    getTodos()
      .then(fetchetTodos => dispatch(todosActions.add(fetchetTodos)))
      .finally(changeLoading);
  }, []);

  const preparedTodos = useMemo(() => getPreparedTodos(todos, filter), [todos, filter]);

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
              {(loading && !preparedTodos.length && <Loader />)
                || <TodoList todos={preparedTodos} changeLoading={changeLoading} />}
            </div>
          </div>
        </div>
      </div>

      {!!currentTodo && (
        <TodoModal loading={loading} changeLoading={changeLoading} />
      )}
    </>
  );
};
