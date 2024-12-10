import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filterTodos } from './utils/todos';
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { todos, query, status, currentTodo } = useAppSelector(state => ({
    todos: state.todos,
    query: state.filter.query,
    status: state.filter.status,
    currentTodo: state.currentTodo,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data: Todo[]) => dispatch(todosActions.setTodos(data)))
      .catch(() => {
        toast.error('Failed to fetch todos');
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filteredTodos = useMemo(
    () => filterTodos(todos, { query, status }),
    [todos, query, status],
  );

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
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
