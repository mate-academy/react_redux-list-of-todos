/* eslint-disable max-len */
import { FC, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as TodosActions } from './features/todos';
import './App.scss';

export const App: FC = () => {
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos()
      .then(data => dispatch(TodosActions.setTodos(data)))
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, {
      todosStatus: filter.status,
      query: filter.query,
    });
  }, [todos, filter.status, filter.query]);

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
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && (
        <TodoModal selectedTodo={currentTodo} />
      )}
    </>
  );
};
